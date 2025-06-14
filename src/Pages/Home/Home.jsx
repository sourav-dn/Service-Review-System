import Banner from '../../Components/Banner/Banner';
import CountUpSection from '../../Components/CountUpSection/CountUpSection';
import FeaturedServices from '../../Components/FeaturedServices/FeaturedServices';
import MeetOurPartners from '../../Components/MeetOurPartners/MeetOurPartners';
import Motion from '../../Components/Motion/Motion';
import UsersReview from '../../Components/UsersReview/UsersReview';
import WhyChooseUs from '../../Components/WhyChooseUs/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedServices></FeaturedServices>
            <Motion></Motion>
            <MeetOurPartners></MeetOurPartners>
            <WhyChooseUs></WhyChooseUs>
            <UsersReview></UsersReview>
            <CountUpSection></CountUpSection>
        </div>
    );
};

export default Home;