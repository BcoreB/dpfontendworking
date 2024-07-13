import { Button } from "./button";

interface NasterHeaderProps {
 
    onNewButtonClicked: () => void;
    onSaveButtonClicked: (value: any) => void;
  
  }
  
  export const NasterHeader: React.FC<NasterHeaderProps> =({onNewButtonClicked,onSaveButtonClicked})=>
  {
    return (
        <header>
                      <div className='flex justify-between bg-purple-100'>
                        <div>
                          <Button  variant='ghost' type="button" onClick={onNewButtonClicked}>New</Button>
                          <Button  variant='ghost'  type="submit"  onClick={onSaveButtonClicked}>Save</Button>
                          <Button  variant='ghost'  type="button">Delete</Button>
                  
                        </div>
                        <div>
                          <Button  variant='ghost'  type="button">Print</Button>
                          <Button  variant='ghost' type="button">Log</Button>
                          <Button  variant='ghost'  type="button">Draft</Button>
                        </div>
                      </div>
                    </header>
    )
  }
  
