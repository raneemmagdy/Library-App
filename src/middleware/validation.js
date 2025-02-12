import { AppGeneralError } from "../utils/index.js";

const validation = async({schema,data}) => {

            const { error } = schema.validate(data, { abortEarly: false });
            if (error) {
                throw new AppGeneralError(error.message, 400);
            }


};
export default validation