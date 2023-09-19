import { unique } from '@/utils'
import env from 'app-env'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import httpClient from '@/lib/httpClient'

import SubmitField from '@/components/Fields/SubmitField'
import TagsField from '@/components/Fields/TagsField'
import TextAreaField from '@/components/Fields/TextAreaField'
import TextField from '@/components/Fields/TextField'
import Heading from '@/components/Heading'

const HostAddPage = () => {
  const [address, setAddress] = useState<string>('')
  const [hostname, setHostname] = useState<string>('')
  const [os, setOs] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [comment, setComment] = useState<string>('')

  const navigate = useNavigate()

  const addHostHandler = async () => {
    const formData = new FormData()
    formData.append('address', address)
    formData.append('hostname', hostname)
    formData.append('os', os)
    formData.append('tags', tags.join('\n'))
    formData.append('comment', comment)

    try {
      await httpClient.post(env.VITE_SERVER_URL + `/storage/host/add`, formData)

      navigate(-1)
    } catch (err) {
      toast.error('Error while adding a host.')
    }
  }
  return (
    <div>
      <Helmet>
        <title>Hosts / Add - sner4</title>
      </Helmet>
      <Heading headings={['Hosts', 'Add']} />
      <form id="host_form" method="post">
        <TextField
          name="address"
          label="Address"
          placeholder="Address"
          required={true}
          _state={address}
          _setState={setAddress}
        />
        <TextField name="hostname" label="Hostname" placeholder="Hostname" _state={hostname} _setState={setHostname} />
        <TextField name="os" label="Os" placeholder="Os" _state={os} _setState={setOs} />
        <TagsField
          name="tags"
          label="Tags"
          placeholder="Tags"
          defaultTags={unique([...env.VITE_HOST_TAGS, ...env.VITE_VULN_TAGS, ...env.VITE_ANNOTATE_TAGS]).sort()}
          _state={tags}
          _setState={setTags}
        />
        <TextAreaField
          name="comment"
          label="Comment"
          placeholder="Comment"
          rows={2}
          _state={comment}
          _setState={setComment}
        />
        <SubmitField name="Add" handler={addHostHandler} />
      </form>
    </div>
  )
}
export default HostAddPage
