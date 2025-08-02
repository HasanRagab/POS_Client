import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  Search, 
  Plus, 
  Edit, 
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  History
} from 'lucide-react';
import {
  inventoryService,
  locationService,
  type Inventory,
  type AdjustInventoryDto,
  type SetInventoryDto,
  type QueryInventoryDto
} from '@/lib/api';
import { toast } from 'sonner';

interface InventoryStats {
  totalProducts: number;
  lowStock: number;
  outOfStock: number;
  totalValue: number;
}

export const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<QueryInventoryDto>({});
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [setQuantityDialogOpen, setSetQuantityDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [adjustmentData, setAdjustmentData] = useState({
    change: 0,
    reason: 'ADJUSTMENT' as const,
    note: ''
  });
  const [quantityData, setQuantityData] = useState({
    quantity: 0,
    note: ''
  });

  const queryClient = useQueryClient();

  // Queries
  const { data: inventoryData, isLoading: inventoryLoading } = useQuery({
    queryKey: ['inventory', filters, searchTerm, selectedLocation],
    queryFn: async () => {
      const queryFilters = {
        ...filters,
        ...(selectedLocation !== 'all' && { locationId: selectedLocation }),
        ...(searchTerm && { search: searchTerm })
      };
      
      if (Object.keys(queryFilters).length > 0) {
        return inventoryService.query(queryFilters);
      }
      return inventoryService.getAll();
    }
  });

  const { data: locationsData } = useQuery({
    queryKey: ['locations'],
    queryFn: () => locationService.getAll()
  });

  const { data: lowStockData } = useQuery({
    queryKey: ['inventory', 'low-stock', selectedLocation],
    queryFn: () => inventoryService.getLowStock(selectedLocation === 'all' ? undefined : selectedLocation)
  });

  const { data: outOfStockData } = useQuery({
    queryKey: ['inventory', 'out-of-stock', selectedLocation],
    queryFn: () => inventoryService.getOutOfStock(selectedLocation === 'all' ? undefined : selectedLocation)
  });

  const { data: inventoryLogsData } = useQuery({
    queryKey: ['inventory-logs', selectedInventory?.productId, selectedInventory?.locationId],
    queryFn: async () => {
      if (!selectedInventory) return { data: [], success: true, message: '', timestamp: '' };
      return inventoryService.getLogsByProduct(selectedInventory.productId);
    },
    enabled: !!selectedInventory && historyDialogOpen
  });

  // Mutations
  const adjustInventoryMutation = useMutation({
    mutationFn: (data: AdjustInventoryDto) => inventoryService.adjust(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      toast.success('Inventory adjusted successfully');
      setAdjustDialogOpen(false);
      setAdjustmentData({ change: 0, reason: 'ADJUSTMENT', note: '' });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to adjust inventory');
    }
  });

  const setInventoryMutation = useMutation({
    mutationFn: (data: SetInventoryDto) => inventoryService.set(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      toast.success('Inventory quantity set successfully');
      setSetQuantityDialogOpen(false);
      setQuantityData({ quantity: 0, note: '' });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to set inventory quantity');
    }
  });

  // Calculate stats
  const stats: InventoryStats = {
    totalProducts: inventoryData?.data?.length || 0,
    lowStock: lowStockData?.data?.length || 0,
    outOfStock: outOfStockData?.data?.length || 0,
    totalValue: inventoryData?.data?.reduce((total, item) => 
      total + (item.quantity * (item.product as any)?.basePrice || 0), 0
    ) || 0
  };

  const handleAdjustInventory = () => {
    if (!selectedInventory) return;
    
    adjustInventoryMutation.mutate({
      productId: selectedInventory.productId,
      locationId: selectedInventory.locationId,
      change: adjustmentData.change,
      reason: adjustmentData.reason,
      note: adjustmentData.note || undefined
    });
  };

  const handleSetQuantity = () => {
    if (!selectedInventory) return;
    
    setInventoryMutation.mutate({
      productId: selectedInventory.productId,
      locationId: selectedInventory.locationId,
      quantity: quantityData.quantity,
      note: quantityData.note || undefined
    });
  };

  const handleFilterChange = (key: keyof QueryInventoryDto, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStockStatus = (inventory: Inventory) => {
    if (inventory.quantity === 0) return { status: 'Out of Stock', variant: 'destructive' as const };
    if (inventory.quantity <= 10) return { status: 'Low Stock', variant: 'secondary' as const };
    return { status: 'In Stock', variant: 'default' as const };
  };

  const openAdjustDialog = (inventory: Inventory) => {
    setSelectedInventory(inventory);
    setAdjustmentData({ change: 0, reason: 'ADJUSTMENT', note: '' });
    setAdjustDialogOpen(true);
  };

  const openSetQuantityDialog = (inventory: Inventory) => {
    setSelectedInventory(inventory);
    setQuantityData({ quantity: inventory.quantity, note: '' });
    setSetQuantityDialogOpen(true);
  };

  const openHistoryDialog = (inventory: Inventory) => {
    setSelectedInventory(inventory);
    setHistoryDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold">{stats.lowStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingDown className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold">{stats.outOfStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">${stats.totalValue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search products or SKUs..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locationsData?.data?.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
              <div>
                <Label htmlFor="minQuantity">Min Quantity</Label>
                <Input
                  id="minQuantity"
                  type="number"
                  placeholder="0"
                  value={filters.minQuantity || ''}
                  onChange={(e) => handleFilterChange('minQuantity', parseInt(e.target.value) || undefined)}
                />
              </div>
              <div>
                <Label htmlFor="maxQuantity">Max Quantity</Label>
                <Input
                  id="maxQuantity"
                  type="number"
                  placeholder="999"
                  value={filters.maxQuantity || ''}
                  onChange={(e) => handleFilterChange('maxQuantity', parseInt(e.target.value) || undefined)}
                />
              </div>
              <div>
                <Label htmlFor="lowStockOnly">Show Low Stock Only</Label>
                <Select 
                  value={filters.lowStockOnly ? 'true' : 'false'} 
                  onValueChange={(value) => handleFilterChange('lowStockOnly', value === 'true')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">All Items</SelectItem>
                    <SelectItem value="true">Low Stock Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({})}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Inventory List */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          {inventoryLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-lg">Loading inventory...</div>
            </div>
          ) : (
            <div className="space-y-4">
              {inventoryData?.data?.map((inventory) => {
                const stockInfo = getStockStatus(inventory);
                return (
                  <div
                    key={`${inventory.productId}-${inventory.locationId}`}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold">{inventory.product.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            {inventory.product.sku && (
                              <span>SKU: {inventory.product.sku}</span>
                            )}
                            <span>Location: {inventory.location.name}</span>
                            <span>Last Updated: {new Date(inventory.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-bold">{inventory.quantity} units</div>
                        <Badge variant={stockInfo.variant}>
                          {stockInfo.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openHistoryDialog(inventory)}
                        >
                          <History className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openAdjustDialog(inventory)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openSetQuantityDialog(inventory)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {inventoryData?.data?.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No inventory items found matching your criteria.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Adjust Inventory Dialog */}
      <Dialog open={adjustDialogOpen} onOpenChange={setAdjustDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Inventory</DialogTitle>
            <DialogDescription>
              Adjust the quantity for {selectedInventory?.product.name} at {selectedInventory?.location.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="change">Quantity Change</Label>
              <Input
                id="change"
                type="number"
                placeholder="Enter positive or negative number"
                value={adjustmentData.change}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAdjustmentData(prev => ({ 
                  ...prev, 
                  change: parseInt(e.target.value) || 0 
                }))}
              />
              <p className="text-sm text-gray-500 mt-1">
                Current: {selectedInventory?.quantity} → New: {(selectedInventory?.quantity || 0) + adjustmentData.change}
              </p>
            </div>
            <div>
              <Label htmlFor="reason">Reason</Label>
              <Select 
                value={adjustmentData.reason} 
                onValueChange={(value) => setAdjustmentData(prev => ({ 
                  ...prev, 
                  reason: value as any 
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADJUSTMENT">Manual Adjustment</SelectItem>
                  <SelectItem value="DAMAGE">Damaged Items</SelectItem>
                  <SelectItem value="LOST">Lost Items</SelectItem>
                  <SelectItem value="FOUND">Found Items</SelectItem>
                  <SelectItem value="TRANSFER">Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="note">Note (Optional)</Label>
              <Textarea
                id="note"
                placeholder="Add a note about this adjustment..."
                value={adjustmentData.note}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAdjustmentData(prev => ({ 
                  ...prev, 
                  note: e.target.value 
                }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjustDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAdjustInventory} 
              disabled={adjustInventoryMutation.isPending}
            >
              {adjustInventoryMutation.isPending ? 'Adjusting...' : 'Adjust Inventory'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Set Quantity Dialog */}
      <Dialog open={setQuantityDialogOpen} onOpenChange={setSetQuantityDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Inventory Quantity</DialogTitle>
            <DialogDescription>
              Set the exact quantity for {selectedInventory?.product.name} at {selectedInventory?.location.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="quantity">New Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                placeholder="Enter exact quantity"
                value={quantityData.quantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantityData(prev => ({ 
                  ...prev, 
                  quantity: parseInt(e.target.value) || 0 
                }))}
              />
              <p className="text-sm text-gray-500 mt-1">
                Current: {selectedInventory?.quantity} → New: {quantityData.quantity}
              </p>
            </div>
            <div>
              <Label htmlFor="setNote">Note (Optional)</Label>
              <Textarea
                id="setNote"
                placeholder="Add a note about this change..."
                value={quantityData.note}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuantityData(prev => ({ 
                  ...prev, 
                  note: e.target.value 
                }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSetQuantityDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSetQuantity} 
              disabled={setInventoryMutation.isPending}
            >
              {setInventoryMutation.isPending ? 'Setting...' : 'Set Quantity'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Inventory History Dialog */}
      <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inventory History</DialogTitle>
            <DialogDescription>
              History for {selectedInventory?.product.name} at {selectedInventory?.location.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {inventoryLogsData?.data?.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      log.change > 0 ? 'bg-green-500' : log.change < 0 ? 'bg-red-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <p className="font-medium">
                        {log.change > 0 ? '+' : ''}{log.change} units
                      </p>
                      <p className="text-sm text-gray-600">
                        {log.reason.toLowerCase().replace('_', ' ')} • {new Date(log.createdAt).toLocaleString()}
                      </p>
                      {log.note && (
                        <p className="text-sm text-gray-500 mt-1">{log.note}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    {log.beforeQuantity} → {log.afterQuantity}
                  </p>
                  {log.user && (
                    <p className="text-xs text-gray-500">{log.user.email}</p>
                  )}
                </div>
              </div>
            ))}
            
            {inventoryLogsData?.data?.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No history available for this item.
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setHistoryDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
