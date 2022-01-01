import React from 'react';
import ReactDOM from 'react-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import Badge from 'react-bootstrap/Badge'


function SubsList(props) {

    console.log(props.subs);


    let subsColumns = [
        { dataField: 'name', text: 'name', sort: true },
        {
            dataField: 'tags',
            text: 'tags',
            formatter: ((data) => {
                return (
                    data.map((e) => {
                        return (
                            <Badge pill bg="primary" >
                                {e}
                            </Badge>
                        )
                    })
                )
            })
        },
    ]



    return (
        <div>
            <link href="/styles/tags.css" rel="stylesheet" />
                <BootstrapTable keyField='id' data={props.subs} columns={subsColumns} />
        </div>
    )
}




export default SubsList;