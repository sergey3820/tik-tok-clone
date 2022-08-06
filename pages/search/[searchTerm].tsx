import React, {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../utils";
import {IUser, Video} from "../../types";
import NoResults from "../../components/NoResults";
import {useRouter} from "next/router";
import VideoCard from "../../components/VideoCard";
import useAuthStore from "../../store/authStore";
import Link from "next/link";
import Image from "next/image";
import {GoVerified} from "react-icons/go";

const Search = ({videos}: { videos: Video[] }) => {
    const [isAccounts, setIsAccounts] = useState(false);
    const {allUsers}: any = useAuthStore();

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

    const router = useRouter();
    const {searchTerm} = router.query;

    return (
        <div className="w-ful">
            <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
                   onClick={() => setIsAccounts(true)}>Videos</p>
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
                   onClick={() => setIsAccounts(false)}>Liked</p>
            </div>
            {isAccounts ? (
                <div className="md:mt-16">
                    {searchedAccounts.length > 0 ? (
                        searchedAccounts.map((user: IUser, idx: number) => (
                            <Link href={`/profile/${user._id}`} key={idx}>
                                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                                    <div>
                                        <Image
                                            src={user.image}
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                            alt="user profile"
                                            layout="responsive"
                                        />
                                        <div className="hidden xl:block">
                                            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                                                {user.userName.replaceAll(' ', '')}
                                                <GoVerified className="text-blue-400"/>
                                            </p>
                                            <p className="capitalize text-gray-400 text-xs">
                                                {user.userName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : <NoResults text={`No video results for ${searchTerm}`}/>}
                </div>
            ) : (
                <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
                    {videos.length ? (
                        videos.map((video: Video, idx) => (
                            <VideoCard post={video} key={idx}/>
                        ))
                    ) : <NoResults text={`No video results for ${searchTerm}`}/>}
                </div>
            )}
        </div>
    );
}

export const getServerSideProps = async ({params: {searchTerm}}: { params: { searchTerm: string } }) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

    return {
        props: {videos: res.data}
    }
}

export default Search;