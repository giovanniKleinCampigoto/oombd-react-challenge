
class Types {
    static createActionTypes (arg) {

        const defaultTypes = {
            REQUEST: {
                value: arg.concat('_REQUEST')
            },
            SUCCESS: {
                value: arg.concat('_SUCCESS')
            },
            FAILURE: {
                value: arg.concat('_FAILURE')
            },
            CANCEL: {
                value: arg.concat('_CANCEL')
            }
        }
    
        const types = {}

        Object.defineProperties(types, defaultTypes);

        return types;
    }
}

export default Types;