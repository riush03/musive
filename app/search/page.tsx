
import Header from "@/components/Header";
import SearchInput from "./components/SearchContent";
import SearchContent from "./components/SearchContent";
import { ISong } from "@/types/types";
interface SearchProps {
    songs: ISong[];
}

export const revalidate = 0;

const Search = async () => {
    

    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full oveflow-hidden overflow-y-auto">
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Search
                    </h1>
                    <SearchInput />
                </div>
            </Header>
            <SearchContent />
        </div>
    )
}

export default Search;