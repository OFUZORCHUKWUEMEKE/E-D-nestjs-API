import { CLOUDINARY } from "../common/utils/constants";
import configuration from "../common/config/config";
import { v2 } from "cloudinary";

const config = configuration()

export const CloudinaryProvider = {
    provide: CLOUDINARY,
    useFactory: () => {
        return v2.config({
            cloud_name: config.cloudinary.cloud_name,
            api_key: config.cloudinary.api_key,
            api_secret: config.cloudinary.api_secret,
        });
    },
};