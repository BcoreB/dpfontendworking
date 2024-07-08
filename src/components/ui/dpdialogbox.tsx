import {create} from "zustand"

interface dialogProps {

    isOpen: boolean;
    onOpen: () => void;
    onClose:  () => void;
    data: any;
    setData(data:any): void;
  }

export const useDialog = create<dialogProps>((set)=>({  
  isOpen: false,
  onOpen: () => set({isOpen:true}),
  onClose:  () => set({isOpen:false}),
  data: {},
  setData:(data)=>set({data:{data}})}) )

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface DPAlertDialogProps {
  setResult:(result:string)=>void
}
export function DPAlertDialog({ setResult }: DPAlertDialogProps) {
  
 

    const {isOpen,onClose}=useDialog()
  return (
    <AlertDialog onOpenChange={onClose} open={isOpen}  defaultOpen={isOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle >Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=>setResult('Cancel')}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>setResult('Continue')}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
