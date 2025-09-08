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
import {RootState} from "../Store/store";

export default function UserStory() {

    const fileRef = useRef<HTMLInputElement>(null);
    const isOpen = useSelector((state: RootState) => state.modalStory.isOpen);
    const dispatch = useDispatch();
    const registeredUser = useSelector((state: RootState) => state.userStore.data);

    const handleStoryModal = () => {
        dispatch(openStoryModal())
        setTimeout(() => {
            fileRef?.current?.click()
        })
    }
    const openStoryView = () => {
        dispatch(openStoryModal())
    }
    const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files;
        if (files && files.length > 0) {
            const file = files[0];

            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    const update = [...registeredUser.stories, e.target?.result as string];
                    if (registeredUser.id) {
                        const updateValue = {
                            id: registeredUser.id,
                            key: 'stories',
                            value: update
                        }
                        // @ts-ignore
                        dispatch(updateUser(updateValue))
                    }
                    return update;

                }
                reader.readAsDataURL(file);
            }
        }
    }

    return (
        <div className="w-full h-[150px] rounded-lg border-1 border-solid bg-[#FFF] relative p-2.5">
            <div className="w-32 h-full ">
                <div className="flex h-full">
                    {registeredUser?.stories.length > 0 &&
                        (<img onClick={openStoryView} src={registeredUser.stories[0]} alt=""
                              className="object-cover h-full"/>)
                    }
                </div>

                <div onClick={handleStoryModal}>
                    <AddStoryIcon/>
                </div>
                {isOpen && (
                    <Modal>
                        <div>
                            <input
                                ref={fileRef}
                                onChange={(event) => fileChange(event)}
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                className="hidden"
                            />
                            <div
                                className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white h-[350px] w-[250px] p-6 rounded-lg shadow-lg w-96 relative">
                                    <div
                                        onClick={() => dispatch(closeStoryModal())}
                                        className=" text-[#000] rounded flex justify-end w-full"
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
                                        {registeredUser?.stories && registeredUser?.stories.map((img, index) => {
                                            return (<SwiperSlide>
                                                <img className="h-[250px] object-cover" key={index}
                                                     src={img}
                                                     alt=""/>
                                            </SwiperSlide>)
                                        })
                                        }
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    )
}