"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/navigation';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPen } from "react-icons/fa";



interface Shortcut {
  id: string;
  name: string;
  url: string;
}

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [shortcuts, setShortcuts] = React.useState<Shortcut[]>([]);
  const [popoverId, setPopoverId] = React.useState<string | null>(null);
  const [popoverAnchor, setPopoverAnchor] = React.useState<HTMLElement | null>(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;

    if (name && url) {
      if (!name) return;

      const newShortcut: Shortcut = {
        id: popoverId || Math.random().toString(36).substr(2, 9),
        name,
        url
      };

      if (popoverId) {
        const updatedShortcuts = shortcuts.map(shortcut =>
          shortcut.id === popoverId ? newShortcut : shortcut
        );
        setShortcuts(updatedShortcuts);
        localStorage.setItem('shortcuts', JSON.stringify(updatedShortcuts));
      } else {
        const updatedShortcuts = [...shortcuts, newShortcut];
        setShortcuts(updatedShortcuts);
        localStorage.setItem('shortcuts', JSON.stringify(updatedShortcuts));
      }
    }

    setName('');
    setUrl('');
    handleClose();
  };

  const handleEditShortcut = (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const editedShortcut = shortcuts.find(shortcut => shortcut.id === id);
    if (editedShortcut) {
      setName(editedShortcut.name);
      setUrl(editedShortcut.url);
      setPopoverId(id);
      setPopoverAnchor(event.currentTarget);
      setOpen(true);
    }
  };
  const handleRemoveShortcut = (id: string) => {
    const updatedShortcuts = shortcuts.filter(shortcut => shortcut.id !== id);
    setShortcuts(updatedShortcuts);
    localStorage.setItem('shortcuts', JSON.stringify(updatedShortcuts));
  };
const router = useRouter()
  const isFormValid = name.trim() !== '' && url.trim() !== '';
const moveShortCut = (url:string)=>{
  router.push(`https://${url}`)
}
  return (
    <React.Fragment>
      <div className='flex row-span-4 gap-2 justify-center items-center flex-wrap w-[680px]'   >
        <div className='grid grid-cols-4  gap-2'>
          {shortcuts  &&
            shortcuts.map((shortcut) => (
              <div key={shortcut.id} className=" w-18  flex h-18 rounded p-4  columns-3  items-center flex-col-4 ">
                <div className='asder'  onClick={()=>moveShortCut(shortcut.url)} >
                <div className="flex items-center justify-center mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  w-12 h-12 rounded-full text-2xl text-black  ">
                  <p>{shortcut.name[0]}</p>
                </div>
                <p className=' text-xl text-center text-white'>{shortcut.name.length > 9 ? shortcut.name.slice(0, 9) + "..." : shortcut.name}</p>
                <div className= " flex my-btn   justify-between   h-[35px]   ">
                  <button  className=' ' onClick={(e) => handleEditShortcut(shortcut.id, e)}><FaPen /></button>
                  <button   onClick={() => handleRemoveShortcut(shortcut.id)}><RiDeleteBin5Line /></button>
                </div>
                </div>
              </div>
            ))
          }
        <Button variant='contained'  className='w-16 h-16 bg-slate-400 mt-3  rounded-full' onClick={handleClickOpen}>
          <div className='flex flex-col justify-center items-center '>
            <div className="flex items-center justify-center  w-12 h-12 rounded-full text-2xl text-black">
              <p>+</p>
            </div>
          </div>
        </Button>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>{popoverId ? 'Edit shortcut' : 'Add shortcut'}</DialogTitle>
        <DialogContent>
          <label className='text-sm' htmlFor="name">Name</label>
          <TextField
            className='bg-[#dbd8d8] rounded-t-lg mb-4'
            autoFocus
            required
            margin="dense"
            id="name"
            name="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleNameChange}
          />
          <label className='text-sm' htmlFor="url">URL</label>
          <TextField
            className='bg-[#dbd8d8] rounded-t-lg '
            autoFocus
            required
            margin="dense"
            id="url"
            name="URL"
            type="text"
            fullWidth
            variant="standard"
            value={url}
            onChange={handleUrlChange}
          />
        </DialogContent>
        <DialogActions>
          <Button className='rounded-full text-xs font-semibold' variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button
            disabled={!isFormValid}
            variant="contained"
            className={`rounded-full bg-teal-500 text-xs font-semibold`}
            type="submit"
          >
            {popoverId ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

     
    </React.Fragment>
  );
}
