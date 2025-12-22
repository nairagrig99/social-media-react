import {Swiper, SwiperSlide} from "swiper/react";
import React, {useEffect} from "react";
import RemoveImageSvg from "../../UI/RemoveImageSvg";
import {ImageGridProps} from "../../Interface/Image-grid-props.interface";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../Store/store";
import {toggleShareModal} from "../../Store/ModalSlice";
import ArrowLeft from "../../UI/ArrowLeftSvg";

export default function ImageSwiper({images, removeImage}: ImageGridProps) {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (!images.length) {
            dispatch(toggleShareModal());
        }
    }, [images]);

    return <>
        <div className="flex justify-between items-center w-fit mb-5 gap-1 cursor-pointer"
             onClick={() => dispatch(toggleShareModal())}>
            <ArrowLeft></ArrowLeft>
            <p>Go Back</p>
        </div>

        <Swiper
            modules={[]}
            slidesPerView={1}
            loop={false}
            className="relative overflow-hidden"
        >
            {
                images.map((src, index) =>
                    <SwiperSlide className="flex justify-center relative ">
                        <img src={src} alt="" className="w-full object-cover h-[450px]"/>
                        <RemoveImageSvg
                            onClick={() => removeImage ? removeImage(index) : ''}
                            className="absolute bottom-[9px] right-[13px] bg-white rounded-full w-10 h-10 p-[6px] cursor-pointer"/>
                    </SwiperSlide>
                )
            }
        </Swiper>
    </>
}