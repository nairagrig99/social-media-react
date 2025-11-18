import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Autoplay, Pagination} from "swiper/modules";
import {useDispatch, useSelector} from "react-redux";
import {useRef} from "react";
import AddStoryIcon from "../UI/AddStoryIcon";
import {closeStoryModal, openStoryModal} from "../Store/ModalSlice";
import Modal from "./Modal";
import CloseSvg from "../UI/CloseSvg";
import {updateUser} from "../Store/userThunk";
import {AppDispatch, RootState} from "../Store/store";
import {useNavigate, useNavigation} from "react-router-dom";

export default function UserStory() {
    const isOpen = useSelector((state: RootState) => state.modalStory.isOpen);
    const dispatch = useDispatch<AppDispatch>();
    const registeredUser = useSelector((state: RootState) => state.userStore.data);
    const navigate = useNavigate();
    const handleStoryModal = () => {
        navigate('/stories/create');
        // dispatch(openStoryModal())
        // setTimeout(() => {
        //     console.log("here workkkkkkk")
        //     fileRef?.current?.click()
        // })
    }
    const openStoryView = () => {
        dispatch(openStoryModal())
    }


    return (
        <div className="w-full flex gap-5 h-[150px] rounded-lg border-1 border-solid bg-[#FFF] relative p-2.5">
            <div className="w-32 h-full ">

                <div className="flex h-full">
                    <div onClick={handleStoryModal}
                         className="object-cover h-full border w-full p-[10px] rounded-[5px]"></div>
                </div>

                <div onClick={handleStoryModal}>
                    <AddStoryIcon/>
                </div>

                {isOpen && (
                    <Modal>
                        <div>

                            <div
                                className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white h-[350px] w-[250px] p-6 rounded-lg shadow-lg w-96 relative">
                                    <div
                                        onClick={() => dispatch(closeStoryModal())}
                                        className="text-[#000] rounded flex justify-end w-full"
                                    >
                                        <CloseSvg/>
                                    </div>

                                    <Swiper
                                        modules={[Pagination, Autoplay]}
                                        slidesPerView={1}
                                        pagination={{clickable: true}}
                                        loop={true}
                                        autoplay={{
                                            delay: 2000,
                                            disableOnInteraction: false,
                                        }}
                                    >
                                        {/*{registeredUser?.stories && registeredUser?.stories.map((img, index) => {*/}
                                        {/*    return (<SwiperSlide>*/}
                                        {/*        <img className="h-[250px] object-cover" key={index}*/}
                                        {/*             src={img}*/}
                                        {/*             alt=""/>*/}
                                        {/*    </SwiperSlide>)*/}
                                        {/*})*/}
                                        {/*}*/}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
            {/*<div className="flex h-full w-32">*/}
            {/*    {registeredUser?.stories.length > 0 &&*/}
            {/*        (<img onClick={openStoryView} src={registeredUser.stories[0]} alt=""*/}
            {/*              className="object-cover h-full"/>)*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    )
}