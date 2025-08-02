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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Percent,
  AlertCircle,
  Package
} from 'lucide-react';
import { 
  discountService, 
  productService,
  type Discount, 
  type CreateDiscountDto
} from '@/lib/api';
import { toast } from 'sonner';

const discountSchema = z.object({
  name: z.string().min(1, 'Discount name is required'),
  code: z.string().optional(),
  type: z.enum(['PERCENT', 'FIXED']),
  value: z.number().min(0, 'Value must be positive'),
  appliesAutomatically: z.boolean().optional(),
  isActive: z.boolean().optional(),
  minPurchaseAmount: z.number().min(0).optional(),
  minQuantity: z.number().min(1).optional(),
  maxUses: z.number().min(1).optional(),
  startAt: z.string().optional(),
  endAt: z.string().optional(),
  productIds: z.array(z.string()).optional(),
});

type DiscountFormData = z.infer<typeof discountSchema>;

export const DiscountManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [discountToDelete, setDiscountToDelete] = useState<Discount | null>(null);
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DiscountFormData>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      name: '',
      code: '',
      type: 'PERCENT',
      value: 0,
      appliesAutomatically: false,
      isActive: true,
      productIds: [],
    },
  });

  const watchType = watch('type');
  const watchAppliesAutomatically = watch('appliesAutomatically');

  // Queries
  const { data: discountsData, isLoading } = useQuery({
    queryKey: ['discounts'],
    queryFn: () => discountService.getAll(),
  });

  const { data: productsData } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll(),
    enabled: showProductSelector,
  });

  // Mutations
  const createDiscountMutation = useMutation({
    mutationFn: (data: CreateDiscountDto) => discountService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      toast.success('Discount created successfully');
      setDialogOpen(false);
      reset();
      setSelectedProducts([]);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create discount');
    },
  });

  const updateDiscountMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateDiscountDto }) =>
      discountService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      toast.success('Discount updated successfully');
      setDialogOpen(false);
      setEditingDiscount(null);
      reset();
      setSelectedProducts([]);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update discount');
    },
  });

  const deleteDiscountMutation = useMutation({
    mutationFn: (id: string) => discountService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      toast.success('Discount deleted successfully');
      setDeleteConfirmOpen(false);
      setDiscountToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete discount');
    },
  });

  const filteredDiscounts = discountsData?.data?.filter((discount) =>
    discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.code?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const onSubmit = (data: DiscountFormData) => {
    const submitData = {
      ...data,
      productIds: selectedProducts.length > 0 ? selectedProducts : undefined,
      startAt: data.startAt || undefined,
      endAt: data.endAt || undefined,
      minPurchaseAmount: data.minPurchaseAmount || undefined,
      minQuantity: data.minQuantity || undefined,
      maxUses: data.maxUses || undefined,
    };

    if (editingDiscount) {
      updateDiscountMutation.mutate({ id: editingDiscount.id, data: submitData });
    } else {
      createDiscountMutation.mutate(submitData);
    }
  };

  const openCreateDialog = () => {
    setEditingDiscount(null);
    setSelectedProducts([]);
    reset({
      name: '',
      code: '',
      type: 'PERCENT',
      value: 0,
      appliesAutomatically: false,
      isActive: true,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (discount: Discount) => {
    setEditingDiscount(discount);
    setSelectedProducts(discount.products?.map(p => p.id) || []);
    reset({
      name: discount.name,
      code: discount.code || '',
      type: discount.type,
      value: discount.value,
      appliesAutomatically: discount.appliesAutomatically,
      isActive: discount.isActive,
      minPurchaseAmount: discount.minPurchaseAmount || undefined,
      minQuantity: discount.minQuantity || undefined,
      maxUses: discount.maxUses || undefined,
      startAt: discount.startAt ? new Date(discount.startAt).toISOString().split('T')[0] : undefined,
      endAt: discount.endAt ? new Date(discount.endAt).toISOString().split('T')[0] : undefined,
    });
    setDialogOpen(true);
  };

  const openDeleteConfirm = (discount: Discount) => {
    setDiscountToDelete(discount);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (discountToDelete) {
      deleteDiscountMutation.mutate(discountToDelete.id);
    }
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getDiscountStatusColor = (discount: Discount) => {
    if (!discount.isActive) return 'secondary';
    if (discount.endAt && new Date(discount.endAt) < new Date()) return 'destructive';
    if (discount.maxUses && discount.usedCount >= discount.maxUses) return 'destructive';
    return 'default';
  };

  const getDiscountStatus = (discount: Discount) => {
    if (!discount.isActive) return 'Inactive';
    if (discount.endAt && new Date(discount.endAt) < new Date()) return 'Expired';
    if (discount.maxUses && discount.usedCount >= discount.maxUses) return 'Used Up';
    return 'Active';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Percent className="w-8 h-8 text-green-500" />
          <h1 className="text-3xl font-bold">Discount Management</h1>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Discount
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search discounts by name or code..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Discount List */}
      <Card>
        <CardHeader>
          <CardTitle>Discounts ({filteredDiscounts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-lg">Loading discounts...</div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDiscounts.map((discount) => (
                  <TableRow key={discount.id}>
                    <TableCell className="font-medium">{discount.name}</TableCell>
                    <TableCell>
                      {discount.code ? (
                        <Badge variant="outline" className="font-mono">
                          {discount.code}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">No code</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={discount.type === 'PERCENT' ? 'default' : 'secondary'}>
                        {discount.type === 'PERCENT' ? 'Percentage' : 'Fixed Amount'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {discount.type === 'PERCENT' 
                        ? `${discount.value}%` 
                        : `$${discount.value.toFixed(2)}`}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getDiscountStatusColor(discount)}>
                        {getDiscountStatus(discount)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {discount.maxUses 
                        ? `${discount.usedCount} / ${discount.maxUses}`
                        : `${discount.usedCount} used`}
                    </TableCell>
                    <TableCell>
                      {discount.products?.length ? (
                        <div className="flex items-center space-x-1">
                          <Package className="w-3 h-3" />
                          <span className="text-sm">{discount.products.length} products</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">All products</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(discount)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteConfirm(discount)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredDiscounts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No discounts found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Discount Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingDiscount ? 'Edit Discount' : 'Create New Discount'}
            </DialogTitle>
            <DialogDescription>
              {editingDiscount 
                ? 'Update the discount information below.' 
                : 'Enter the details for the new discount.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Discount Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Summer Sale, Student Discount"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Discount Code (Optional)</Label>
                <Input
                  id="code"
                  placeholder="e.g., SUMMER2024"
                  {...register('code')}
                />
                {errors.code && (
                  <p className="text-sm text-red-500">{errors.code.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Discount Type</Label>
                <Select value={watchType} onValueChange={(value) => setValue('type', value as 'PERCENT' | 'FIXED')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENT">Percentage</SelectItem>
                    <SelectItem value="FIXED">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">
                  {watchType === 'PERCENT' ? 'Percentage (%)' : 'Amount ($)'}
                </Label>
                <Input
                  id="value"
                  type="number"
                  step={watchType === 'PERCENT' ? '0.01' : '0.01'}
                  min="0"
                  max={watchType === 'PERCENT' ? '100' : undefined}
                  placeholder={watchType === 'PERCENT' ? '10' : '5.00'}
                  {...register('value', { valueAsNumber: true })}
                />
                {errors.value && (
                  <p className="text-sm text-red-500">{errors.value.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="appliesAutomatically"
                  {...register('appliesAutomatically')}
                />
                <Label htmlFor="appliesAutomatically">Apply Automatically</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  {...register('isActive')}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>

            {/* Conditional code field */}
            {!watchAppliesAutomatically && (
              <div className="space-y-2">
                <Label>Discount Code Required</Label>
                <p className="text-sm text-gray-500">
                  Since automatic application is disabled, customers will need to enter a discount code.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minPurchaseAmount">Min Purchase ($)</Label>
                <Input
                  id="minPurchaseAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register('minPurchaseAmount', { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minQuantity">Min Quantity</Label>
                <Input
                  id="minQuantity"
                  type="number"
                  min="1"
                  placeholder="1"
                  {...register('minQuantity', { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxUses">Max Uses</Label>
                <Input
                  id="maxUses"
                  type="number"
                  min="1"
                  placeholder="Unlimited"
                  {...register('maxUses', { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startAt">Start Date</Label>
                <Input
                  id="startAt"
                  type="date"
                  {...register('startAt')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endAt">End Date</Label>
                <Input
                  id="endAt"
                  type="date"
                  {...register('endAt')}
                />
              </div>
            </div>

            {/* Product Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Applicable Products</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowProductSelector(!showProductSelector)}
                >
                  <Package className="w-3 h-3 mr-1" />
                  {showProductSelector ? 'Hide Products' : 'Select Products'}
                </Button>
              </div>
              
              {selectedProducts.length > 0 && (
                <div className="text-sm text-gray-600">
                  {selectedProducts.length} product(s) selected
                </div>
              )}

              {showProductSelector && (
                <Card className="max-h-48 overflow-y-auto">
                  <CardContent className="p-3">
                    {productsData?.data?.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-2 py-1 hover:bg-gray-50 rounded px-2"
                      >
                        <input
                          type="checkbox"
                          id={`product-${product.id}`}
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                          className="rounded"
                        />
                        <Label
                          htmlFor={`product-${product.id}`}
                          className="text-sm flex-1 cursor-pointer"
                        >
                          {product.name}
                          {product.sku && (
                            <span className="text-gray-500 ml-1">({product.sku})</span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
              
              {selectedProducts.length === 0 && (
                <p className="text-sm text-gray-500">
                  No products selected - discount will apply to all products
                </p>
              )}
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
                  ? editingDiscount
                    ? 'Updating...'
                    : 'Creating...'
                  : editingDiscount
                  ? 'Update Discount'
                  : 'Create Discount'}
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
              <span>Delete Discount</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{discountToDelete?.name}"? This action cannot be undone.
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
              disabled={deleteDiscountMutation.isPending}
            >
              {deleteDiscountMutation.isPending ? 'Deleting...' : 'Delete Discount'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
