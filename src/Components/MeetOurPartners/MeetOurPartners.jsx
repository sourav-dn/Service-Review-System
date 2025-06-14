import { motion } from "motion/react"

const partners = [
  {
    name: "TechNova",
    logo: "https://i.ibb.co/Wv1WsWBP/tech-nova-logo.png",
    description: "Provided backend infrastructure and database optimization support."
  },
  {
    name: "DevSpark",
    logo: "https://i.ibb.co/W4GnD3Hb/devspark-logo2.jpg",
    description: "Collaborated on frontend design and React UI integration."
  },
  {
    name: "CloudCore",
    logo: "https://i.ibb.co/yBswZQKx/cloud-core-logo.jpg",
    description: "Supported hosting, deployment, and cloud storage services."
  },
  {
    name: "UIVerse",
    logo: "https://i.ibb.co/99pCm3k5/uiverse-logo.png",
    description: "Crafted interactive user interfaces and accessibility enhancements."
  },
  {
    name: "DataFlex",
    logo: "https://i.ibb.co/7xbp4xPQ/dataflex-logo.jpg",
    description: "Helped integrate analytics tools and user behavior tracking."
  },
  {
    name: "CodeLab",
    logo: "https://i.ibb.co/PXvKhZx/codelab-logo.jpg",
    description: "Contributed to code optimization and GitHub CI/CD pipelines."
  }
];

const MeetOurPartners = () => {
  return (
    <section className="my-20 px-6 md:px-16 lg:px-24 text-center">
      <marquee><h2 className="text-4xl font-bold mb-12 text-blue-700"> Meet Our Partners</h2></marquee>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            className="p-6 border shadow-md rounded-xl bg-white hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <img src={partner.logo} alt={partner.name} className="mx-auto mb-4 h-20 w-20 object-contain" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{partner.name}</h3>
            <p className="text-gray-600 text-sm">{partner.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurPartners;
