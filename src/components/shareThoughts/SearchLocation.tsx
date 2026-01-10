import Search, {SearchHandle} from "../Search";
import {useContext, useEffect, useRef, useState} from "react";
import {FormContext} from "../../Context/FormContext";
import {AppDispatch, RootState} from "../../Store/store";
import {useDispatch, useSelector} from "react-redux";
import {toggleShareModal} from "../../Store/ModalSlice";
import {countryThunk, userLocationThunk} from "../../Store/countryThunk";
import {Country} from "../../Interface/select-interface";

export default function SearchLocation() {

    const searchRef = useRef<SearchHandle | null>(null)

    const [location, setLocation] = useState<Country[] | Country>();
    const context = useContext(FormContext);
    const dispatch = useDispatch<AppDispatch>();
    const selectLocation = useSelector((state: RootState) => state.userLocationSlice.location);
    const countrySelect = useSelector((state: RootState) => state.countrySlice.location);

    useEffect(() => {
        dispatch(countryThunk())
        dispatch(userLocationThunk())
    }, [dispatch]);

    useEffect(() => {
        const country = countrySelect.find((item) => item.country.toLowerCase() === selectLocation.country_name.toLowerCase())
        if (country) setLocation(country);
    }, [selectLocation]);

    useEffect(() => {
        searchRef.current?.onValueChange((searchValue) => {
            const reduceSearchList = countrySelect.reduce((acc: any, next: any) => {
                //if search is only country name
                if (lowerCase(next.country) === lowerCase(searchValue)) {
                    acc.push({country: next.country, cities: next.cities})
                }

                // if search is only city name
                const cityList = next.cities.reduce((acc: any, city: string) => {
                    if (lowerCase(city).includes(searchValue)) {
                        acc.country = next.country
                        acc.city = city
                    }
                    return acc;
                }, {})

                // if search value is country and also city
                if (cityList.country && cityList.city) {
                    acc.push({country: cityList.country, city: cityList.city})
                }
                return acc
            }, []);

            if (reduceSearchList.length) {
                setLocation(reduceSearchList);
            }
        });
    }, [searchRef.current]);

    const lowerCase = (element: string) => element.trim().toLowerCase()
    const selectUserLocation = (country: string, city: string) => {
        context?.handleChange('location', country.concat(',').concat(city));
        setTimeout(() => {
            dispatch(toggleShareModal(''))
        }, 200)
    }

    if (!location) return null;

    return (
        <>
            <Search ref={searchRef}/>
            <div className="overflow-y-scroll h-[331px] pt-2">
                {Array.isArray(location) &&
                    location.map((item: Country) => {
                        if (item.city) {
                            return (
                                <div
                                    className="flex gap-2"
                                    key={`${item.country}-${item.city}`}
                                    onClick={() => item.city && selectUserLocation(item.country, item.city)}
                                >
                                    <p>{item.country},</p>
                                    <p>{item.city}</p>
                                </div>
                            );
                        }

                        return item.cities?.map((city: string) => (
                            <div
                                className="flex gap-2"
                                key={`${item.country}-${city}`}
                                onClick={() => selectUserLocation(item.country, city)}
                            >
                                <p>{item.country},</p>
                                <p>{city}</p>
                            </div>
                        ));
                    })}
            </div>
        </>
    )
}