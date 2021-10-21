import MyButton from '@/components/UI/MyButton'
import MyInput from '@/components/UI/MyInput'
import MyDialog from '@/components/UI/MyDialog'
import MySelect from '@/components/UI/MySelect'

//чтобы каждый раз не импортровать UI компоненты, вынесем в отдельный файл и добавим в main.js
export default [
    MyButton,
    MyInput,
    MyDialog,
    MySelect
]