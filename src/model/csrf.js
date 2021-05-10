import { types } from "mobx-state-tree";

export const CsrfToken = types
    .model("CsrfToken",{
        value: types.string,
    })
    .actions(self => ({
        setValue(value) {
            self.value = value
        },
    })); 

export default CsrfToken;