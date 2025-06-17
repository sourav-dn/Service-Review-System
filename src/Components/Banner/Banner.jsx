
const Banner = () => {
    return (
        <div className="carousel w-full ">
            <div id="slide1" className="carousel-item relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
                <img
                    src="https://i.ibb.co/6JWccDXj/pet1.jpg"
                    className="w-full h-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
                <img
                    src="https://i.ibb.co/0WPBF8m/i2-c.jpg"
                    className="w-full h-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
                <img
                    src="https://i.ibb.co/0jz0YSN6/garden2-edit.jpg"
                    className="w-full h-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;