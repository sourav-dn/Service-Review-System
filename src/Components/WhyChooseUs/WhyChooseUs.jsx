import { motion } from "motion/react"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const WhyChooseUs = () => {
  return (
    <section className="my-20 px-6 md:px-16 lg:px-24 text-center">
      <motion.h2
        className="text-4xl font-bold mb-10 text-purple-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
         Why Choose Us?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {["Verified Reviews", "Trusted Services", "Smart Management"].map((title, i) => (
          <motion.div
            key={i}
            className="bg-white shadow-lg p-6 rounded-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm">
              {i === 0
                ? "All reviews are from real users with real service experiences to help you decide better."
                : i === 1
                ? "Each service is monitored for quality, user rating, and consistency in customer satisfaction."
                : "Easily add, manage, and review services from your personalized dashboard."}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
