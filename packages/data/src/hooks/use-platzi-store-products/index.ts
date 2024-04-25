import { useEffect, useState } from 'react';

import {
  createProduct,
  CreateProductRequest,
  deleteProduct,
  getProduct,
  getProducts,
  Product,
  updateProduct,
  UpdateProductRequest,
} from '../../services';

export type ProductError = {
  message: string;
  title: string;
};

export type Data =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: ProductError }
  | { status: 'hasData'; data: Product[]; message?: string }
  | { status: 'hasSingleData'; data: Product };

export default function usePlatziStoreProducts(fetchOnMount = true) {
  const [data, setData] = useState<Data>({ status: 'idle' });

  const fetchProducts = async (message?: string) => {
    if (data.status !== 'loading') {
      setData({ status: 'loading' });
    }

    const response = await getProducts();

    if (response.success && response.data) {
      setData({ status: 'hasData', data: response.data, message });
    } else {
      setData({
        status: 'error',
        error: {
          message: response.message,
          title: 'Products Fetch Failed',
        },
      });
    }
  };

  const fetchProduct = async (id: string) => {
    setData({ status: 'loading' });

    const response = await getProduct(id);

    if (response.success && response.data) {
      setData({ status: 'hasSingleData', data: response.data });
    } else {
      setData({
        status: 'error',
        error: {
          message: response.message,
          title: 'Product Fetch Failed',
        },
      });
    }
  };

  const create = async (
    product: CreateProductRequest,
    canGetProducts = true
  ) => {
    setData({ status: 'loading' });
    const response = await createProduct(product);

    if (response.success && response.data && canGetProducts) {
      await fetchProducts('Product created successfully! 🎉');
    } else {
      setData({
        status: 'error',
        error: {
          message: response.message,
          title: 'Product Creation Failed',
        },
      });
    }

    if (response.success && data.status === 'loading') {
      setData({ status: 'idle' });
    }
  };

  const update = async (
    id: string,
    product: UpdateProductRequest,
    canGetProducts = true
  ) => {
    setData({ status: 'loading' });
    const response = await updateProduct(id, product);

    if ((response.success && response.data, canGetProducts)) {
      await fetchProducts('Product updated successfully! 🎉');
    } else {
      setData({
        status: 'error',
        error: {
          message: response.message,
          title: 'Product Update Failed',
        },
      });
    }
  };

  const remove = async (id: string) => {
    setData({ status: 'loading' });
    const response = await deleteProduct(id);

    if (response.success && response.data) {
      await fetchProducts('Product deleted successfully! 🎉');
    } else {
      setData({
        status: 'error',
        error: {
          message: response.message,
          title: 'Product Deletion Failed',
        },
      });
    }

    if (response.success && data.status === 'loading') {
      setData({ status: 'idle' });
    }
  };

  const hasDataMessage = data.status === 'hasData' ? !!data.message : false;

  useEffect(() => {
    if (hasDataMessage) {
      const timeout = setTimeout(() => {
        setData((prev) => ({
          ...prev,
          message: undefined,
        }));
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [hasDataMessage]);

  useEffect(() => {
    if (fetchOnMount) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchOnMount]);

  return {
    fetchProducts,
    fetchProduct,
    create,
    update,
    remove,
    data,
  };
}
