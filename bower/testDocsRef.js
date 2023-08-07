
/** @param {import("moment")} date */
const mDate = (date) => date.format('')

/** 
 * @param {import("models").User} user
 * @returns {Models.User}
 */
const mUser = (user) => Object.assign({ id: user.id, email: user.email })
mUser({ username: "vi", email: "" })


class MyTest {
    /** @type {JQuery<Element>} $element */
    $element;

    /**
     * @param {JQuery<Element>} element
     */
    constructor(element) {
        this.$element = $(element)
        /** @type {Models.User} data */
        const data = this.$element.data()
        if (data?.email) {
        }

        this.$element.on('kucing', (event, data) => { })
        this.$element.on('sapi', (event, data) => {
            event.preventDefault()
            if (data && typeof data === 'object') {
            }
        })
        this.$element.on('sapi')
        this.$element.on('wedus', (event, response, user) => {
            response.height
            user.email
        })

        this.$element.modal()
    }
}