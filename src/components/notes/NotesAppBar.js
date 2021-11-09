import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startSaveNote, startUploading } from '../../actions/notes'
import moment from 'moment'
import { useForm } from '../../hooks/useForm'




export const NotesAppBar = () => {
    
    const dispatch = useDispatch()
    const {active} = useSelector(state => state.notes)


    const handleSave = () => {

        dispatch(startSaveNote(active))

    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click()
        console.log('picture')
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            dispatch(startUploading(file));
        }
    }

/*     const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`; */


    const [formValues, handleInputChange, reset] = useForm(active);

    const {body, title, id, date} = formValues

    const activeId = useRef(active.id)
    

    useEffect(() => {
        
        if (active.id !== activeId.current) {
            reset(active);
            activeId.current = active.id
        }
    }, [active, reset])


    useEffect(() => {
        
        dispatch(activeNote(formValues.id, {...formValues}));

    }, [formValues, dispatch])

    const noteDate = moment(date)


    

    

    return (
        <div className="notes__appbar">
            <span>{noteDate.format('Do')} of {noteDate.format('MMMM')}</span>


            <input
                id="fileSelector"
                type= "file"
                name="file"
                style={{display: 'none'}}
                onChange={handleFileChange}
            />


            <div className="dFlex">
                <button className="btn btn-two" onClick={handlePictureClick}>
                    Picture
                </button>

                <button className="btn btn-two" onClick={handleSave}>
                    Save
                </button>


            </div>
            
        </div>
    )
}
