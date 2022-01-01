import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Badge from 'react-bootstrap/Badge'

import countries from "./countries"
import { CountrySelector, CustomTags } from "./indexComponents/tagSelecter"

import subs from './indexComponents/subs.json'
import { tags, filterSubsByTags, filterSubsByTagsSingle } from "./indexComponents/tags"
import LinksBar from "./linksBar"



export default function yeet() {
  let subsData = subs.map((sub) => {
    return {
      name: sub.name,
      tagsCount: sub.tags.length,
      tagsList: sub.tags.sort().reduce((prev, cur) => { if (prev === "") { return cur } else { return prev + ", " + cur } }, ""),
      tags: sub.tags,
    }
  });

  let subsColumns = [
    { dataField: 'name', text: 'name' },
    { dataField: 'tagsCount', text: 'tagsCount', sort: true },
    // { dataField: 'tagsList', text: 'tagsList' },
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



  let tagsData = tags.map((tag) => {
    const mySubs = filterSubsByTagsSingle(tag);
    return {
      tagName: tag,
      subs: mySubs.map((e) => { return e }),
    }
  })

  let tagsColumns = [
    { dataField: 'tagName', text: 'tagName' },
    {
      dataField: 'subs',
      text: 'subs',
      formatter: ((data) => {
        return (
          <div>
            {
              data.map((e) => {
                return (
                  <Badge bg="secondary" style={{marginRight: '2px'}}>
                    {e.name}
                  </Badge>
                )
              })
            }
          </div>
        )
      })
    },
  ]



  return (
    <div>
      <link href="/styles/tags.css" rel="stylesheet" />
      <LinksBar />
      <div class="container">
        <h1>Subreddits</h1>
        <BootstrapTable keyField='id' data={subsData} columns={subsColumns} />
        <hr />
        <h1>Tags</h1>
        <BootstrapTable keyField='id' data={tagsData} columns={tagsColumns} />
        <hr />
      </div>
    </div>
  )

}