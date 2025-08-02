import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Plus, Edit, Trash2, Package, Search, Download, 
  AlertTriangle, Tag 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { productService } from '@/lib/products';
import type { ProductFilters } from '@/lib/products';
import { categoryService } from '@/lib/categories';
import { toast } from 'sonner';
import type { Product, CreateProductDto, Category } from '@/lib/api';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  kind: z.enum(['PHYSICAL', 'DIGITAL', 'SERVICE']),
  price: z.number().min(0, 'Price must be positive'),
  costPrice: z.number().min(0).optional(),
  trackInventory: z.boolean().optional(),
  categoryId: z.string().optional(),
  description: z.string().optional(),
  tagsString: z.string().optional(), // Changed from tags to tagsString
  status: z.enum(['ACTIVE', 'INACTIVE', 'DISCONTINUED']).optional(),
  minStockLevel: z.number().min(0).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export function EnhancedProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      kind: 'PHYSICAL',
      status: 'ACTIVE',
      trackInventory: true,
    },
  });

  useEffect(() => {
    loadData();
  }, [filters]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery) {
        setFilters(prev => ({ ...prev, search: searchQuery }));
      } else {
        setFilters(prev => {
          const { search, ...rest } = prev;
          return rest;
        });
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(filters),
        categoryService.getAll({ limit: 100 }),
      ]);
      setProducts(productsData.data);
      setCategories(categoriesData.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: ProductFormData) => {
    try {
      // Process tags from string to array and convert form data to CreateProductDto
      const processedData: CreateProductDto = {
        ...data,
        tags: data.tagsString ? data.tagsString.split(',').map((tag: string) => tag.trim()).filter(Boolean) : [],
      };
      
      // Remove tagsString from the data sent to API
      const { tagsString, ...apiData } = processedData as any;

      if (editingProduct) {
        await productService.update(editingProduct.id, apiData);
        toast.success('Product updated successfully');
      } else {
        await productService.create(apiData);
        toast.success('Product created successfully');
      }

      setIsDialogOpen(false);
      setEditingProduct(null);
      reset();
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await productService.delete(id);
      toast.success('Product deleted successfully');
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) return;

    try {
      await productService.bulkDelete(selectedProducts);
      toast.success(`${selectedProducts.length} products deleted successfully`);
      setSelectedProducts([]);
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete products');
    }
  };

  const openEditProduct = (product: Product) => {
    setEditingProduct(product);
    reset({
      name: product.name,
      slug: product.slug,
      sku: product.sku || '',
      barcode: product.barcode || '',
      kind: product.kind === 'BUNDLE' ? 'PHYSICAL' : product.kind as 'PHYSICAL' | 'DIGITAL' | 'SERVICE',
      price: product.price,
      costPrice: product.costPrice || 0,
      trackInventory: product.trackInventory,
      categoryId: product.category?.id || '',
      description: product.description || '',
      tagsString: product.tags?.join(', ') || '',
      status: product.status === 'DRAFT' ? 'ACTIVE' : product.status as 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED',
      minStockLevel: product.minStockLevel || 0,
    });
    setIsDialogOpen(true);
  };

  const openCreateProduct = () => {
    setEditingProduct(null);
    reset({
      kind: 'PHYSICAL',
      status: 'ACTIVE',
      trackInventory: true,
    });
    setIsDialogOpen(true);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const watchName = watch('name');
  useEffect(() => {
    if (watchName && !editingProduct) {
      setValue('slug', generateSlug(watchName));
    }
  }, [watchName, editingProduct, setValue]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'INACTIVE': return 'bg-yellow-100 text-yellow-800';
      case 'DISCONTINUED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getKindIcon = (kind: string) => {
    switch (kind) {
      case 'PHYSICAL': return <Package className="w-4 h-4" />;
      case 'DIGITAL': return <Download className="w-4 h-4" />;
      case 'SERVICE': return <Tag className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleExport = async () => {
    try {
      const blob = await productService.exportProducts(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `products-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Products exported successfully');
    } catch (error) {
      toast.error('Failed to export products');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-gray-600">Manage your product catalog and inventory</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateProduct}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Edit Product' : 'Create New Product'}
                </DialogTitle>
                <DialogDescription>
                  {editingProduct
                    ? 'Update the product details below.'
                    : 'Add a new product to your catalog.'
                  }
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-4">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing & Stock</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter product name"
                          {...register('name')}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                          id="slug"
                          placeholder="product-slug"
                          {...register('slug')}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="kind">Type</Label>
                        <Select
                          value={watch('kind')}
                          onValueChange={(value: 'PHYSICAL' | 'DIGITAL' | 'SERVICE') =>
                            setValue('kind', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PHYSICAL">Physical Product</SelectItem>
                            <SelectItem value="DIGITAL">Digital Product</SelectItem>
                            <SelectItem value="SERVICE">Service</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sku">SKU</Label>
                        <Input
                          id="sku"
                          placeholder="PROD-001"
                          {...register('sku')}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="barcode">Barcode</Label>
                        <Input
                          id="barcode"
                          placeholder="1234567890123"
                          {...register('barcode')}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="categoryId">Category</Label>
                        <Select
                          value={watch('categoryId') || ''}
                          onValueChange={(value) => setValue('categoryId', value || undefined)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">No Category</SelectItem>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={watch('status')}
                          onValueChange={(value: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED') =>
                            setValue('status', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                            <SelectItem value="DISCONTINUED">Discontinued</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="pricing" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Selling Price</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...register('price', { valueAsNumber: true })}
                        />
                        {errors.price && (
                          <p className="text-sm text-red-500">{errors.price.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="costPrice">Cost Price</Label>
                        <Input
                          id="costPrice"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...register('costPrice', { valueAsNumber: true })}
                        />
                      </div>

                      <div className="col-span-2 space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="trackInventory"
                            {...register('trackInventory')}
                            className="rounded"
                          />
                          <Label htmlFor="trackInventory">Track Inventory</Label>
                        </div>
                      </div>

                      {watch('trackInventory') && (
                        <div className="space-y-2">
                          <Label htmlFor="minStockLevel">Min Stock Level</Label>
                          <Input
                            id="minStockLevel"
                            type="number"
                            placeholder="0"
                            {...register('minStockLevel', { valueAsNumber: true })}
                          />
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <textarea
                        id="description"
                        placeholder="Product description..."
                        className="w-full min-h-[100px] p-3 border rounded-md resize-none"
                        {...register('description')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        placeholder="tag1, tag2, tag3"
                        {...register('tagsString')}
                      />
                      <p className="text-sm text-gray-500">
                        Separate tags with commas
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingProduct ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={filters.categoryId || ''}
              onValueChange={(value) => setFilters(prev => ({ ...prev, categoryId: value || undefined }))}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.status || ''}
              onValueChange={(value) => setFilters(prev => ({ ...prev, status: value as any || undefined }))}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="DISCONTINUED">Discontinued</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedProducts.length} product(s) selected
              </span>
              <div className="space-x-2">
                <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({products.length})</CardTitle>
          <CardDescription>
            Manage your product catalog and inventory levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No products found</p>
              <p className="text-sm text-gray-400">Create your first product to get started</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts(products.map(p => p.id));
                        } else {
                          setSelectedProducts([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {getKindIcon(product.kind)}
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            {product.sku && `SKU: ${product.sku}`}
                          </div>
                          {product.tags && product.tags.length > 0 && (
                            <div className="flex space-x-1 mt-1">
                              {product.tags.slice(0, 2).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {product.tags.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{product.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.category?.name || 'Uncategorized'}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">${product.price.toFixed(2)}</div>
                        {product.costPrice && (
                          <div className="text-sm text-gray-500">
                            Cost: ${product.costPrice.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.trackInventory ? (
                        <div className="flex items-center space-x-2">
                          <span>{product.stockQuantity || 0}</span>
                          {product.minStockLevel && product.stockQuantity !== undefined && 
                           product.stockQuantity <= product.minStockLevel && (
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">Not tracked</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(product.status)}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditProduct(product)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
