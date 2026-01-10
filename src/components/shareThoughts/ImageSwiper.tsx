import {Swiper, SwiperSlide} from "swiper/react";
import React, {useEffect} from "react";
import RemoveImageSvg from "../../UI/RemoveImageSvg";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../Store/store";
import {toggleShareModal} from "../../Store/ModalSlice";
import useContextHook from "../../Hooks/useContextHook";

export default function ImageSwiper() {
    const dispatch = useDispatch<AppDispatch>()
    const context = useContextHook()

    useEffect(() => {
        if (!context.form.images.length) {
            dispatch(toggleShareModal(''));
        }
    }, [context.form.images, dispatch]);

    return <>
        <Swiper
            modules={[]}
            slidesPerView={1}
            loop={false}
            className="relative overflow-hidden"
        >
            {
                context.form.images.map((src, index) =>
                    <SwiperSlide className="flex justify-center relative ">
                        <img src={src} alt="" className="w-full object-cover h-[450px]"/>
                        <RemoveImageSvg
                            onClick={() => context.removeImage && context.removeImage(index)}
                            className="absolute bottom-[9px] right-[13px] bg-white rounded-full w-10 h-10 p-[6px] cursor-pointer"/>
                    </SwiperSlide>
                )
            }
        </Swiper>
    </>
}