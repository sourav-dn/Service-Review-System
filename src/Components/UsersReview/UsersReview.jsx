import { motion } from "motion/react"
import { FaStar } from "react-icons/fa";

const reviews = [
    {
        name: "Sadia Akter",
        text: "This platform helped me find a great AC repair service in minutes. The review system is super useful!",
        avatar: "https://i.ibb.co/pvrQD69H/girl-avatar.png",
        rating: 5
    },
    {
        name: "Tanvir Hossain",
        text: "I was able to promote my cleaning business and collect feedback from real clients. Highly recommended!",
        avatar: "https://i.ibb.co/1Jdt1L4p/boy-avatar.png",
        rating: 4
    },
    {
        name: "Mizanur Rahman",
        text: "This is the most user-friendly platform I’ve seen for reviewing and adding services.",
        avatar: "https://i.ibb.co/0RD7dGjH/boy2-avatar.png",
        rating: 5
    },
    {
        name: "Anika Chowdhury",
        text: "The real reviews helped me confidently choose home service providers. Very trustworthy.",
        avatar: "https://i.ibb.co/pvrQD69H/girl-avatar.png",
        rating: 4
    },
    {
        name: "Shahriar Ahmed",
        text: "Easy to register, smooth interface, and useful for small service businesses.",
        avatar: "https://i.ibb.co/1Jdt1L4p/boy-avatar.png",
        rating: 5
    },
    {
        name: "Farzana Bithi",
        text: "I always check reviews here before booking services. It's fast and accurate!",
        avatar: "https://i.ibb.co/pvrQD69H/girl-avatar.png",
        rating: 4
    }
];

const zoomIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i) => ({
        scale: 1,
        opacity: 1,
        transition: { delay: i * 0.2, duration: 0.5 }
    })
};

const UsersReview = () => {
    return (
        <section className="py-20 px-6 mb-5 md:px-16 lg:px-24 bg-gradient-to-r from-green-50 to-green-100 text-center">
            <motion.h2
                className="text-4xl font-bold mb-12 text-green-700"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                 What Our Users Say
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {reviews.map((item, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition"
                        custom={index}
                        variants={zoomIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <img
                            src={item.avatar}
                            alt={item.name}
                            className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-green-500"
                        />
                        <p className="text-gray-700 italic mb-4">“{item.text}”</p>
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <div className="flex justify-center mt-2">
                            {Array(item.rating)
                                .fill()
                                .map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400" />
                                ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default UsersReview;