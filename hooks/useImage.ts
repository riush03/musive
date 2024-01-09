import { MusicProtocol } from "@/utils/protocols/music.protocol";
import { queryRecords } from "@/utils/web5";

const useDwnImage = async() => {
    const { records } = await queryRecords({
        message: {
            filter: {
                protocol: MusicProtocol.protocol,
                protocolPath: 'art',
                schema: MusicProtocol.types.art.schema,
                dataFormat: MusicProtocol.types.art.dataFormats[0],
            },
          },
        });
    return records;
};

export default useDwnImage;

