import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
  isAdmin?: boolean; // Add isAdmin to the interface
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm, isAdmin } = params;
    let searchString = searchTerm || "";
    let query: any = {};
    
    if (category) {
      query.category = category;
    }

    // Add the inStock filter only if the request is not from an admin
    if (!isAdmin) {
      query.inStock = true;
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: 'desc',
          },
        },
      },
    });
    
    return products;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
