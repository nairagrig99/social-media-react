import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Autoplay, Pagination} from "swiper/modules";
import {useDispatch, useSelector} from "react-redux";
import AddStoryIcon from "../UI/AddStoryIcon";
import {closeStoryModal, openStoryModal} from "../Store/ModalSlice";
import Modal from "./Modal";
import CloseSvg from "../UI/CloseSvg";
import {AppDispatch, RootState} from "../Store/store";
import {useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import MuteSvg from "../UI/MuteSvg";
import React, {useEffect, useRef, useState} from "react";
import {StoryCombineAndModal} from "../Interface/user-interface";
import useExpiredStories from "../Hooks/useExpiredStories";
import {updateUser} from "../Store/userThunk";

export default function UserStory() {
    const isOpen = useSelector((state: RootState) => state.modalStory.isOpen);
    const dispatch = useDispatch<AppDispatch>();
    const registeredUser = useSelector((state: RootState) => state.userStore.signInUser);
    const audioRef = useRef<HTMLAudioElement[]>([]);
    const [isMute, setIsMute] = useState<boolean>(false)
    const navigate = useNavigate();
    const [storyList, setStoryList] = useState<StoryCombineAndModal[]>([]);
    const expiredStory = useExpiredStories();
    const handleStoryModal = () => {
        navigate('/stories/create');
    }
    useEffect(() => {
        // if (registeredUser) {
        //     const photoStories = expiredStory(registeredUser?.stories?.photoStoryList);
        //     const textStories = expiredStory(registeredUser?.stories?.textStoryList);
        //     if (registeredUser.id && (photoStories || textStories)) {
        //         console.log("here work time");
        //         dispatch(updateUser({
        //             id: registeredUser.id,
        //             key: 'stories',
        //             photoStoryList: photoStories,
        //             textStoryList: textStories
        //         }))
        //     }
        //
        // }
    }, [])

    useEffect(() => {
        if (registeredUser.stories) {

            const combineStories = []
            if (registeredUser.stories.photoStoryList) {
                combineStories.push(...registeredUser.stories.photoStoryList)
            }

            if (registeredUser.stories.textStoryList) {
                combineStories.push(...registeredUser.stories.textStoryList)
            }

            combineStories.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime())
            if (combineStories.length) {
                // @ts-ignore
                setStoryList(combineStories);
            }
        }
    }, [registeredUser]);

    const openStoryView = () => {
        dispatch(openStoryModal())
    }

    const turnOnOffVoice = (audio: HTMLAudioElement) => {
        muteVoice(audio);
        setIsMute((mute) => !mute)
    }
    const muteVoice = (audio: HTMLAudioElement) => {
        if (!audio) return;

        if (audio.muted) {
            audio.muted = false;
            audio.play();
        } else {
            audio.muted = true;
            audio.pause();
        }
    }
    const slideChange = (swiper: any) => {
        setIsMute(false);
        if (swiper.slides.length - 1 === swiper.activeIndex) {
            setTimeout(() => {
                dispatch(closeStoryModal())
            }, 10000);

        }
        audioRef.current.forEach((audio) => {
            if (audio) {
                audio.muted = true;
                audio.pause();
            }
        })

        if (audioRef.current[swiper.activeIndex] !== undefined) {
            muteVoice(audioRef.current[swiper.activeIndex])
        }
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
                {isOpen && storyList && (
                    <Modal>
                        <div>

                            <div
                                className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white h-[547px] w-[347px] p-6 rounded-lg shadow-lg w-96 relative">
                                    <div
                                        onClick={() => dispatch(closeStoryModal())}
                                        className="text-[#000] rounded flex justify-end w-full"
                                    >
                                        <CloseSvg/>
                                    </div>

                                    <Swiper
                                        modules={[Pagination, Autoplay]}
                                        onInit={() => {
                                            if (audioRef.current.length) {
                                                audioRef.current[0].muted = false;
                                                audioRef.current[0].play();
                                            }
                                        }}
                                        autoplay={{
                                            delay: 10000,
                                            disableOnInteraction: false,
                                        }}
                                        slidesPerView={1}
                                        pagination={{clickable: true}}
                                        loop={false}
                                        className="relative overflow-hidden"
                                        onSlideChange={(swiper: any) => slideChange(swiper)}
                                    >
                                        {storyList && storyList.map((story: StoryCombineAndModal, index: number) => {
                                            return (<SwiperSlide
                                                style={{
                                                    backgroundColor: story?.textSettings?.text && story?.textSettings?.text?.color ? story?.textSettings?.text?.color : "#FFF",
                                                    height: `497px`
                                                }}
                                            >

                                                {story.photo &&
                                                    (
                                                        <img className="object-cover" key={index}
                                                             style={{height: `547px`}}
                                                             src={story.photo}/>
                                                    )

                                                }

                                                {story.textSettings &&
                                                    (
                                                        <>
                                                            <p className="relative"
                                                               style={{

                                                                   fontSize: `${story.textSettings.text.fontSize}px`,
                                                                   top: `${story.textSettings.text.positionY}px`,
                                                                   left: `${story.textSettings.text.positionX}px`
                                                               }}
                                                               key={index}>
                                                                {story.text}
                                                            </p>
                                                        </>
                                                    )
                                                }
                                                {(story.textSettings?.song?.previewUrl ||
                                                    story.photoSettings?.song?.previewUrl) && (
                                                    <>
                                                        <audio
                                                            ref={(el) => {
                                                                if (el) audioRef.current[index] = el;
                                                            }}
                                                            controls
                                                            muted
                                                            src={
                                                                story.textSettings?.song?.previewUrl ??
                                                                story.photoSettings?.song?.previewUrl
                                                            }
                                                            className="w-48 hidden"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                        <MuteSvg
                                                            mute={isMute}
                                                            className="absolute top-[12px] z-[9999] right-[15px] bg-[rgba(225,225,225,0.8)] w-[35px] h-[35px] rounded-full"
                                                            onClick={() => turnOnOffVoice(audioRef.current[index])}
                                                        />
                                                    </>
                                                )}
                                            </SwiperSlide>)
                                        })
                                        }
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )
                }
            </div>
            <div className="flex h-full w-32">
                {(registeredUser.stories?.photoStoryList?.length || registeredUser?.stories?.textStoryList?.length) &&
                    registeredUser.stories.photoStoryList[0].photo?.length &&
                    (<img onClick={openStoryView}
                          src={registeredUser.stories.photoStoryList[0].photo} alt=""
                          className="object-cover h-full"/>)
                }
            </div>
        </div>
    )
}