import React from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../Store/store";
import {toggleShareModal} from "../../Store/ModalSlice";
import {ImageGridProps} from "../../Interface/Image-grid-props.interface";


const ImageGrid = React.memo(({images}: ImageGridProps) => {
    const dispatch = useDispatch<AppDispatch>()

    const gridClasses =
        images.length === 1
            ? "grid-cols-1"
            : images.length === 2 || images.length === 3 || images.length > 3
                ? "grid-cols-2"
                : "";

    return (
        <div className={`grid ${gridClasses}`}>
            {
                images.map((src, index) => (
                    <div
                        key={src+index}
                        className={`relative w-full h-full
                            ${index === 0 ? 'row-span-2' : ''}
                            ${index > 2 ? 'hidden' : ''}
                          `}
                    >
                        <img
                            src={src}
                            alt=""
                            className={`w-full h-full object-cover
                              ${images.length > 3 && index === 2 ? 'opacity-40' : ''}
                                `}
                            onClick={() => dispatch(toggleShareModal())}
                        />

                        {images.length > 3 && index === 2 && (
                            <span
                                onClick={() => dispatch(toggleShareModal())}
                                className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold bg-black/30">
                        +{images.length - 3}
                             </span>
                        )}
                    </div>
                ))
            }
        </div>
    )
})
export default ImageGrid