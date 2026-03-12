import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  brand: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Oversized Hoodie",
    price: 59,
    image: product1.src,
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    description: "Premium cotton oversized hoodie with a relaxed fit. Perfect for layering or wearing on its own.",
    brand: "SENORA",
    inStock: true,
  },
  {
    id: "2",
    name: "Essential Tee",
    price: 35,
    image: product2.src,
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    description: "Minimalist essential t-shirt crafted from organic cotton. A wardrobe staple.",
    brand: "SENORA",
    inStock: true,
  },
  {
    id: "3",
    name: "Leather Biker Jacket",
    price: 299,
    image: product3.src,
    category: "Men",
    sizes: ["S", "M", "L"],
    colors: ["Black"],
    description: "Genuine leather biker jacket with asymmetric zip closure. Timeless rebel style.",
    brand: "SENORA",
    inStock: true,
  },
  {
    id: "4",
    name: "Linen Drawstring Trousers",
    price: 89,
    image: product4.src,
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige"],
    description: "Lightweight linen trousers with an elastic drawstring waist. Summer essential.",
    brand: "SENORA",
    inStock: true,
  },
  {
    id: "5",
    name: "Cashmere Sweater",
    price: 189,
    image: product1.src,
    category: "Women",
    sizes: ["S", "M", "L"],
    colors: ["Black"],
    description: "Luxurious cashmere blend sweater with a relaxed silhouette.",
    brand: "SENORA",
    inStock: true,
  },
  {
    id: "6",
    name: "Tailored Blazer",
    price: 245,
    image: product3.src,
    category: "Women",
    sizes: ["S", "M", "L"],
    colors: ["Black"],
    description: "Structured tailored blazer with peak lapels. Effortlessly sophisticated.",
    brand: "SENORA",
    inStock: false,
  },
  {
    id: "7",
    name: "Relaxed Fit Denim",
    price: 120,
    image: product4.src,
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige"],
    description: "Premium Japanese selvedge denim with a relaxed straight fit.",
    brand: "SENORA",
    inStock: true,
  },
  {
    id: "8",
    name: "Silk Camisole",
    price: 95,
    image: product2.src,
    category: "Women",
    sizes: ["S", "M", "L"],
    colors: ["White"],
    description: "Delicate silk camisole with adjustable straps and a V-neckline.",
    brand: "SENORA",
    inStock: true,
  },
];

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}
