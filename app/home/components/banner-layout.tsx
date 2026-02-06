import React from 'react'
import { BannerModel } from '@/types/models'
import { MdPageview } from "react-icons/md";
import { GiAerialSignal } from "react-icons/gi";
import { MdPermMedia } from "react-icons/md";
import { PiStarFourBold } from "react-icons/pi";
import BackgroundImg from '@/components/ui/background-image';
import { BsCollectionPlayFill } from "react-icons/bs";
import BackgroundVideo from '@/components/ui/background-video';

function BannerLayout({ banner }: { banner: BannerModel}) {
    return (
        <div className='   flex flex-col text-white bg-red-500'>
            {banner?.type && [1, 2, 3].includes(banner.type) ?
                <BackgroundImg imageSrc={`/storage/images/banners/${banner?.media}`} className='aspect-21/9'>
                    {
                        banner?.type == 3 &&
                        <div className="bg-linear-to-t from-black/40 via-transparent to-black/40 aspect-21/9 " >
                            <div className="bg-linear-to-r from-black/80  to-transparent aspect-21/9 grid grid-cols-5">
                                <div className='p-16 flex items-end md:col-span-2'>
                                    <div>
                                        {banner.highlight_text &&
                                            <div className="text-white w-fit text-[8px] border rounded-lg px-2 py-0.5 poppins-semibold flex items-center gap-1">
                                                <GiAerialSignal />{banner.highlight_text.toUpperCase()}
                                            </div>
                                        }
                                        <div className="text-white inter-bold font-extrabold text-3xl mt-3">{banner.title}</div>
                                        <div className='flex flex-row pt-1 pb-3'>
                                            {banner.episodes && <span className='text-[11.5px] poppins-semibold flex gap-2 pr-2 border-r items-center'> <MdPermMedia /> {banner.episodes} Episodes</span>}
                                            <span className='text-[11.5px] poppins-semibold flex gap-2 pr-2 ml-2 items-center'> <PiStarFourBold /> Featured Program </span>
                                        </div>
                                        <div className='poppins-light text-white text-[10.5px] text-justify'> {banner.description}</div>
                                        <button className='text-white mt-6 bg-transparent border border-white text-sm inter-semibold'>
                                            <BsCollectionPlayFill /> View Episodes
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        banner?.type == 2 &&
                        <div className="bg-linear-to-t from-black/40 via-transparent to-black/40 aspect-21/9 " >
                            <div className="bg-linear-to-r from-black/80  to-transparent aspect-21/9 grid grid-cols-5">
                                <div className='p-16 flex items-end md:col-span-2'>
                                    <div>
                                        <div className="text-white inter-bold font-extrabold text-3xl mt-3">{banner.title}</div>
                                        {banner.highlight_text && <div className='flex flex-row pt-1 pb-2'>
                                            <span className='text-[11.5px] poppins-semibold flex gap-2 pr-2 items-center'>  <PiStarFourBold /> {banner.highlight_text.toUpperCase()}  <PiStarFourBold /> </span>
                                        </div>}
                                        <div className='poppins-light text-white text-[10.5px] text-justify'> {banner.description}</div>
                                        <button className='text-white mt-4 bg-transparent border border-white text-sm inter-semibold '><MdPageview /> BROWSE NOW </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </BackgroundImg> :
                <BackgroundVideo videoSrc={`/storage/videos/banners/${banner?.media}`} className=' aspect-21/9 p-0 overflow-hidden'>
                    {
                        banner?.type == 4 &&
                        <div className="bg-linear-to-t from-black/40 via-transparent to-black/40 aspect-21/9 " >
                            <div className="bg-linear-to-r from-black/90  to-transparent aspect-21/9 grid grid-cols-5">
                                <div className='p-16 flex items-end md:col-span-2'>
                                    <div>
                                        {banner.highlight_text &&
                                            <div className="text-white w-fit text-[8px] border rounded-lg px-2 py-0.5 poppins-semibold flex items-center gap-1">
                                                <GiAerialSignal />{banner.highlight_text.toUpperCase()}
                                            </div>
                                        }
                                        <div className="text-white inter-bold font-extrabold text-3xl mt-3">{banner.title}</div>
                                        <div className='flex flex-row pt-1 pb-3'>
                                            {banner.episodes && <span className='text-[11.5px] poppins-semibold flex gap-2 pr-2 border-r items-center'> <MdPermMedia /> {banner.episodes} Episodes</span>}
                                            <span className='text-[11.5px] poppins-semibold flex gap-2 pr-2 ml-2 items-center'> <PiStarFourBold /> Featured Program </span>
                                        </div>
                                        <div className='poppins-light text-white text-[10.5px] text-justify'> {banner.description}</div>
                                        <button className='text-white mt-6 bg-transparent border border-white text-sm inter-semibold'>
                                            <BsCollectionPlayFill /> View Episodes
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        banner?.type == 6 &&
                        <div className="bg-linear-to-t from-black/40 via-transparent to-black/40 aspect-21/9 " >
                            <div className="bg-linear-to-r from-black/90  to-transparent aspect-21/9 grid grid-cols-5">
                                <div className='p-16 flex items-end md:col-span-2'>
                                    <div>
                                        <div className="text-white inter-bold font-extrabold text-3xl mt-3">{banner.title}</div>
                                        {banner.highlight_text && <div className='flex flex-row pt-1 pb-2'>
                                            <span className='text-[11.5px] poppins-semibold flex gap-2 pr-2 items-center'>  <PiStarFourBold /> {banner.highlight_text.toUpperCase()}  <PiStarFourBold /> </span>
                                        </div>}
                                        <div className='poppins-light text-white text-[10.5px] text-justify'> {banner.description}</div>
                                        <button className='text-white mt-4 bg-transparent border border-white text-sm inter-semibold '><MdPageview /> BROWSE NOW </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </BackgroundVideo>
            }
        </div>
    )
}

export default BannerLayout