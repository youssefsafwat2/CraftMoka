const About = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#A03907]">About CraftMoka</h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Welcome to CraftMoka! A destination for unique, handcrafted
            Pharaonic-inspired artifacts and exquisite jewelry. We’re dedicated
            to blending Egypt’s rich cultural heritage with modern elegance.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="public\img\products\carmen-ring_5.jpg"
              alt="Pharaonic Art"
              className="rounded-lg shadow-lg object-cover h-80 w-full"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 mb-4">
              At CraftMoka, our vision is to create a platform that bridges the
              ancient beauty of Egypt with the modern world. Each item reflects
              the timeless charm of Pharaonic artistry, reimagined for today’s
              fashion and home decor.
            </p>
            <p className="text-gray-600">
              {`
              Whether you're seeking unique jewelry or handcrafted home pieces,
              CraftMoka offers a curated collection that is both historically
              significant and stylishly contemporary.`}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0 md:order-2">
            <img
              src="public\img\products\yaiza-earrings_5.jpg"
              alt="CraftMoka Jewelry"
              className="rounded-lg shadow-lg object-cover h-80 w-full"
            />
          </div>
          <div className="md:w-1/2 md:pr-8 md:order-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4">
              Our mission at CraftMoka is to celebrate Egypt’s rich artistic
              legacy by offering products that showcase impeccable craftsmanship
              and design. Each piece is a blend of history, culture, and modern
              aesthetic.
            </p>
            <p className="text-gray-600">
              We are passionate about preserving tradition while innovating new
              ways to bring Egypt’s story to life through art and jewelry.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
