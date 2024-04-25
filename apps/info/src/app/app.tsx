import { Product } from '@mfe-tutorial/data';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Label,
} from '@mfe-tutorial/ui';
import { Loader, Plus, RefreshCcwIcon, Trash } from 'lucide-react';
import usePlatziStoreProducts from 'packages/data/src/hooks/use-platzi-store-products';

const getFormattedAmount = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

function ProductCarousel({ images }: { images: Product['images'] }) {
  return (
    <Carousel className="items-center justify-center w-full h-full">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image}>
            <img
              alt={image}
              className="object-cover w-full h-48 rounded-lg"
              src={image.replace(/[\\[\]",]/g, '')}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}

function ProductCard({
  product,
  children,
}: {
  product: Product;
  children?: React.ReactNode;
}) {
  return (
    <Card className="flex flex-col justify-between w-full h-full">
      <CardHeader>
        <ProductCarousel images={product.images} />
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-x-4">
        <Label>Price</Label>
        <Label className="text-gray-500">
          {getFormattedAmount(product.price)}
        </Label>
      </CardContent>
      <CardFooter className="flex flex-col justify-between w-full gap-4 xl:flex-row">
        <Badge variant="default">{product.category.name}</Badge>
        {children}
      </CardFooter>
    </Card>
  );
}

function CreateProductButton({ callback }: { callback: () => void }) {
  return (
    <Button onClick={callback} tooltip="Create Product" variant="icon">
      <Plus className="text-white" />
    </Button>
  );
}

export function App() {
  const { create, data, fetchProduct, fetchProducts, remove, update } =
    usePlatziStoreProducts();

  if (data.status === 'loading') {
    return (
      <main className="flex flex-col items-center justify-center w-full h-screen gap-y-4">
        <Loader className="animate-spin" size="3rem" />
        Loading...
      </main>
    );
  }

  if (data.status === 'error') {
    return (
      <main className="flex flex-col items-center justify-center w-full h-full">
        <p className="text-red-500">An error occurred!</p>
        <p className="text-red-500">{data.error.message}</p>
        <Button onClick={() => fetchProducts()} variant="destructive">
          <RefreshCcwIcon /> Retry
        </Button>
      </main>
    );
  }

  const renderContent = () => {
    if (data.status === 'hasData') {
      const { data: products, message } = data;

      return (
        <main className="flex flex-col items-center justify-center w-full h-full p-4">
          {message && (
            <Badge
              className="flex items-center justify-center w-full px-8 py-4 text-3xl"
              variant="default"
            >
              {message}
            </Badge>
          )}
          <ul className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product}>
                  <div className="space-x-4">
                    <Button
                      onClick={() => fetchProduct(String(product.id))}
                      variant="default"
                    >
                      <RefreshCcwIcon />
                    </Button>
                    <Button
                      onClick={async () => {
                        await remove(String(product.id));
                      }}
                      tooltip="Remove Product"
                      variant="destructive"
                    >
                      <Trash />
                    </Button>
                    <Button
                      onClick={async () => {
                        const updatedProduct = {
                          ...product,
                          title: `${product.title} Updated`,
                        };

                        await update(String(product.id), updatedProduct);
                      }}
                      tooltip="Update Product"
                      variant="icon"
                    >
                      <RefreshCcwIcon />
                    </Button>
                  </div>
                </ProductCard>
              </li>
            ))}
          </ul>
        </main>
      );
    }

    if (data.status === 'hasSingleData') {
      const { data: product } = data;

      return (
        <main className="flex flex-col items-center justify-center w-full h-full p-4 mx-auto md:w-1/2">
          <ProductCard product={product}>
            <Button onClick={() => fetchProducts()} variant="default">
              <RefreshCcwIcon /> Back
            </Button>
          </ProductCard>
        </main>
      );
    }

    return (
      <main className="flex flex-col items-center justify-center w-full h-full">
        <p className="text-red-500">No products found!</p>
        <Button onClick={() => fetchProducts()}>
          <RefreshCcwIcon /> Retry
        </Button>
      </main>
    );
  };

  return (
    <div className="relative">
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-gray-300 border-b shadow-md">
        <h1 className="text-3xl font-bold text-primary">Platzi Store</h1>
        <CreateProductButton
          callback={async () => {
            const newProduct = {
              title: 'New Product',
              description: 'This is a new product.',
              price: 100,
              categoryId: 1,
              images: ['https://via.placeholder.com/300'],
            };

            await create(newProduct);
          }}
        />
      </header>
      {renderContent()}
    </div>
  );
}

export default App;
