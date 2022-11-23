import V from "../../library/variable";
import pathUtil from "shared/utils/path.util";

export default {
    getUploadedImageSrc(imageName?: string, uploadPaths = pathUtil.uploads): any {
        return imageName && !V.isEmpty(imageName)
            ? (imageName.isUrl())
                ? imageName
                : uploadPaths.images + imageName
            : uploadPaths.static + "empty.jpg"
    },
}