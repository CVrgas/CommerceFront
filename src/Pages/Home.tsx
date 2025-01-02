import BigBanner from "../Components/BigBanner.tsx";
import BannerStyle from "../Types/BannerStyle.ts";

function Home() {
  const banners: BigBanner[] = [
    {
      title: "Indulge in Caramel Bliss",
      body: "Dive into a rich and creamy experience with our Caramel Macchiato. Crafted with velvety steamed milk, bold espresso, and a luxurious caramel drizzle. Perfect for a sweet escape in every sip!",
      style: BannerStyle.lightDark(),
      link: "/menu/Hot_Coffees/caramel_macchiato",
      imageUrl: "https://placehold.co/800x600",
    },
    {
      title: "Refresh with Iced Green Tea",
      body: "Cool down with the invigorating taste of our Iced Green Tea. A perfect blend of premium green tea leaves, lightly sweetened and served over ice for a refreshing pick-me-up. Light, crisp, and oh-so-refreshing!",
      style: BannerStyle.dark(),
    },
    {
      title: "Latte Love, Almond-Style",
      body: "Discover a dairy-free delight with our Iced AlmondMilk Latte. Creamy almond milk paired with smooth espresso, served over ice for a guilt-free, plant-based treat. Deliciously satisfying!",
      style: BannerStyle.lightDark(),
    },
  ];
  return (
    <div className="flex flex-col gap-2 flex-grow mx-16">
      {banners.map((banner) => (
        <BigBanner key={banner.title} {...banner} />
      ))}
    </div>
  );
}

export default Home;
