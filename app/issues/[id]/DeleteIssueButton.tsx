"use client"

import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: string}) => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const DeleteIssue = async () => {
    try {
      setIsDeleting(true)
      await axios.delete('/api/issues/' + issueId)
      router.push('/issues/list')
      router.refresh()
    } catch (error) {
      setIsDeleting(false)
      setError(true)
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button className='bg-red-500 rounded-lg text-white font-semibold py-1.5 text-sm' disabled={isDeleting}>
            <div>
              Delete Issue
              {isDeleting && <Spinner />}
            </div>
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <button className='bg-gray-200 rounded-lg px-3 py-1 text-sm'>
                <div>
                  Cancel
                </div>
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <button type="button" className='bg-red-500 px-3 rounded-lg text-white font-semibold py-1.5 text-sm'  onClick={DeleteIssue}>
                <div>
                  Delete Issue
                </div>
              </button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>
            Error
          </AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button mt="2" color='gray' variant='soft' onClick={() => setError(false)}>
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton