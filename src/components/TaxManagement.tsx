import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Calculator,
  AlertCircle
} from 'lucide-react';
import { taxService, type Tax, type CreateTaxDto } from '@/lib/api';
import { toast } from 'sonner';

const taxSchema = z.object({
  name: z.string().min(1, 'Tax name is required'),
  rate: z.number().min(0, 'Rate must be positive').max(100, 'Rate cannot exceed 100%'),
  isInclusive: z.boolean().optional(),
});

type TaxFormData = z.infer<typeof taxSchema>;

export const TaxManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTax, setEditingTax] = useState<Tax | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taxToDelete, setTaxToDelete] = useState<Tax | null>(null);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaxFormData>({
    resolver: zodResolver(taxSchema),
    defaultValues: {
      name: '',
      rate: 0,
      isInclusive: false,
    },
  });

  // Queries
  const { data: taxesData, isLoading } = useQuery({
    queryKey: ['taxes'],
    queryFn: () => taxService.getAll(),
  });

  // Mutations
  const createTaxMutation = useMutation({
    mutationFn: (data: CreateTaxDto) => taxService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taxes'] });
      toast.success('Tax created successfully');
      setDialogOpen(false);
      reset();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create tax');
    },
  });

  const updateTaxMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateTaxDto }) =>
      taxService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taxes'] });
      toast.success('Tax updated successfully');
      setDialogOpen(false);
      setEditingTax(null);
      reset();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update tax');
    },
  });

  const deleteTaxMutation = useMutation({
    mutationFn: (id: string) => taxService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taxes'] });
      toast.success('Tax deleted successfully');
      setDeleteConfirmOpen(false);
      setTaxToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete tax');
    },
  });

  const filteredTaxes = taxesData?.data?.filter((tax) =>
    tax.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const onSubmit = (data: TaxFormData) => {
    if (editingTax) {
      updateTaxMutation.mutate({ id: editingTax.id, data });
    } else {
      createTaxMutation.mutate(data);
    }
  };

  const openCreateDialog = () => {
    setEditingTax(null);
    reset({
      name: '',
      rate: 0,
      isInclusive: false,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (tax: Tax) => {
    setEditingTax(tax);
    reset({
      name: tax.name,
      rate: tax.rate,
      isInclusive: tax.isInclusive,
    });
    setDialogOpen(true);
  };

  const openDeleteConfirm = (tax: Tax) => {
    setTaxToDelete(tax);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (taxToDelete) {
      deleteTaxMutation.mutate(taxToDelete.id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calculator className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">Tax Management</h1>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Tax
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search taxes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tax List */}
      <Card>
        <CardHeader>
          <CardTitle>Taxes ({filteredTaxes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-lg">Loading taxes...</div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTaxes.map((tax) => (
                  <TableRow key={tax.id}>
                    <TableCell className="font-medium">{tax.name}</TableCell>
                    <TableCell>{tax.rate}%</TableCell>
                    <TableCell>
                      <Badge variant={tax.isInclusive ? 'default' : 'secondary'}>
                        {tax.isInclusive ? 'Inclusive' : 'Exclusive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(tax.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(tax)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteConfirm(tax)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTaxes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No taxes found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Tax Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTax ? 'Edit Tax' : 'Create New Tax'}
            </DialogTitle>
            <DialogDescription>
              {editingTax 
                ? 'Update the tax information below.' 
                : 'Enter the details for the new tax.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tax Name</Label>
              <Input
                id="name"
                placeholder="e.g., Sales Tax, VAT"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Tax Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="0.00"
                {...register('rate', { valueAsNumber: true })}
              />
              {errors.rate && (
                <p className="text-sm text-red-500">{errors.rate.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isInclusive"
                {...register('isInclusive')}
              />
              <Label htmlFor="isInclusive">Tax Inclusive</Label>
              <div className="text-sm text-gray-500 ml-2">
                (Price includes tax vs. tax added on top)
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? editingTax
                    ? 'Updating...'
                    : 'Creating...'
                  : editingTax
                  ? 'Update Tax'
                  : 'Create Tax'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span>Delete Tax</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{taxToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteTaxMutation.isPending}
            >
              {deleteTaxMutation.isPending ? 'Deleting...' : 'Delete Tax'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
