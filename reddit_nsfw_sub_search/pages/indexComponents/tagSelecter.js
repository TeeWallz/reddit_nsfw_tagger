import React, { useCallback, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
const ReactTags = require('react-tag-autocomplete')
import suggestions from '../countries'
import { matchSorter } from 'match-sorter'
import Badge from 'react-bootstrap/Badge'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'next/router'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { useEffect } from 'react';
import { useRouterQuery } from 'next-router-query';

import { tagsFilterDict, tags_set, subs, filterSubsByTags } from "./tags"
import SubsList from "./subsList"


class TagSelecter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {'selectedTags': []};

    }


    componentDidMount() { 
        // Have we loaded into a fresh load with tags in the URL already?
        let tagsToAppend = [];

        this.getParams().forEach(element => {
            tagsToAppend.push({id: element, name:element})
        });

        this.onSelectedTagAddition(tagsToAppend);
    } 


    //     onSelectedTagDelete = useCallback((tagIndex) => {
    //         setSelectedTags(selectedTags.filter((_, i) => i !== tagIndex))
    //     }, [selectedTags])

    //     function onSelectedTagAddition(newTag) {
    //         setSelectedTags([...selectedTags, newTag])
    //     }


    onSelectedTagDelete = (tagIndex) => {
        this.setState({ selectedTags: this.state.selectedTags.filter((_, i) => i !== tagIndex) })
    }

    onSelectedTagAddition = (newTag) => {
        if(Array.isArray(newTag)){
            this.setState({ selectedTags: [...this.state.selectedTags, ...newTag] })
        }
        else{
            this.setState({ selectedTags: [...this.state.selectedTags, newTag] })
        }
        
    }

    findTagInTagsFilterDict = (tag) => {
        // WTF IS THIS
        const muhTags = tagsFilterDict;
        debugger;

        muhTags.forEach(element => {
            debugger;
            if(element.name === tag){
                return element;
            }
        });

        return {};
    }


    tagClick = (event) => {
        this.setState(
            {
                selectedTags: [...this.state.selectedTags, { name: event.target.dataset.tag }]
            }
        , (e) => {
            this.updateURL();
        });
    }

    suggestionsTransform = (query, suggestions) => {
        if (suggestions === '') {
            return [];
        }
        // console.log({ query })
        // console.log({ suggestions })
        return matchSorter(
            suggestions,
            query,
            { minRanking: matchSorter.rankings.CONTAINS, keys: ["name"] }
        );
    }


    

    // URL Functions
    getParams = () => {
        if('tags' in this.props.routerQuery){
            return this.props.routerQuery.tags.split('-');
        }
        else{
            return []
        }
    }
    setParams = ({ query = "" }) => {
        const searchParams = new URLSearchParams();
        searchParams.set("query", query);
        return searchParams.toString();
    }
    updateURL = () => {
        const tagz = this.state.selectedTags.map((e) => { return e.name }).join('-')
        // const tagz = selectedTags[0].name;

        const url = this.setParams({ query: tagz });
        //do not forget the "?" !
        // history.push(`?${url}`);
        // console.log("updateURL");
        // console.log(url);
        this.props.router.push({
            pathname: '/',
            query: { tags: tagz }
        })
    };




    render() {
        // const { tags } = this.props.router.query
        const tags = [];
        // console.log({tags})


        const tagsList = tagsFilterDict.map((tag, id) => {
            // console.log(this.state.selectedTags);
            const tagsArray = this.state.selectedTags.map((tag) => tag.name);
            if (!(tagsArray.includes(tag.name)))
                return (
                    <Badge pill bg="primary" style={{ cursor: "pointer" }} onClick={this.tagClick} data-tag={tag.name} >
                        {tag.name}
                    </Badge>
                )
        })

        return (
            <>
                <p>Select your smut by typing or clicking tags:</p>
                <p>{tags}</p>
                <ReactTags
                    // ref={reactTags}
                    tags={this.state.selectedTags}
                    suggestions={tagsFilterDict}
                    suggestionsTransform={this.suggestionsTransform}
                    noSuggestionsText='No matching countries'
                    onDelete={this.onSelectedTagDelete}
                    onAddition={this.onSelectedTagAddition}
                />
                <p>
                    Tags:
                    <ul>
                        {tagsList}
                    </ul>
                </p>
                {/* <pre><code>{JSON.stringify(filterSubsByTags(this.state.selectedTags), null, 2)}</code></pre> */}
                <div>
                    <SubsList subs={filterSubsByTags(this.state.selectedTags)}/>
                </div>
            </>
        )
    }






















    //     const[selectedTags, setSelectedTags] = useState([])
    //     // useEffect(() => {
    //     //     console.log('Do something after selectedTags has changed', selectedTags);
    //     //     updateURL();
    //     // }, [selectedTags]);
    //     const reactTags = useRef()











    // // URL stuff





    // const params = getParams('www.first-contrib.fr?query=react');
    // const [selectedParams, setSelectedParams] = useState([])


    // function updateInputValue(e) {
    //     console.log(e);
    //     setSelectedParams(e.target.value)
    // };

    // function setParams({ query = "" }) {
    //     const searchParams = new URLSearchParams();
    //     searchParams.set("query", query);
    //     return searchParams.toString();
    // }


    // function updateURL() {
    //     const tagz = selectedTags.map((e) => { return e.name }).join('-')
    //     // const tagz = selectedTags[0].name;

    //     const url = setParams({ query: tagz });
    //     //do not forget the "?" !
    //     // history.push(`?${url}`);
    //     console.log("updateURL");
    //     console.log(url);
    //     Router.push({
    //         pathname: '/',
    //         query: { tags: tagz }
    //     })
    // };





    // const url = setParams({ query: "javascript" });
    // console.log(url); // "query=javascript"



}

// export default withRouter(TagSelecter)

const TagSelecterWithRouter = (props) => {
    const router = useRouter()
    const routerQuery = useRouterQuery()
    return <TagSelecter {...props} router={router} routerQuery={routerQuery} />
}
export default TagSelecterWithRouter;
