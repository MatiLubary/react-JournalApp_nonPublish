import React from 'react'
import moment from 'moment'
import { activeNote } from '../../actions/notes'
import { useDispatch } from 'react-redux'

export const JournalEntry = ({id, date, title, body, url}) => {


    const noteDate = moment(date)

    const dispatch = useDispatch(activeNote)

    

    const handleEntryClick = () => {

        dispatch(activeNote( id, {
            date, title, body, url
            }
        ))
    }
    
    return (
        <div className="journal__entry animate__animated animate__faster" onClick={handleEntryClick} data-id={id}>
            
            {
                url && 
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ url })`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title mb-1">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <h2 className="">{noteDate.format('Do')}</h2>
                <p>{noteDate.format('dddd')}</p>
            </div>


        </div>
    )
}
