import { useEffect, useState } from "react";
import "./App.css";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./components/ui/button";

import {
  fetchUsers,
  addUser,
  deleteUser,
  updateUser,
  setSelectedUserId,
  setFormState,
} from "./features/users/userSlice";

import { type RootState } from "./app/store";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "./components/ui/input";
import { useDispatch, useSelector } from "react-redux";

type table = {
  _id: string;
  name: string;
  email: string;
  age: string;
};

function App() {
  const dispatch = useDispatch();
  const table = useSelector((state: RootState) => state.user.users);
  const formState = useSelector((state: RootState) => state.user.formState);
  const selected = useSelector((state: RootState) => state.user.selectedUserId);

  const [open, setOpen] = useState(false);

  function handleAddUser() {
    dispatch(addUser(formState));
    setOpen(false); // close sheet after adding
  }

  function handleDeleteUser(id: string) {
    dispatch(deleteUser(id));
  }

  function handleUpdateUser(id: string) {
    dispatch(updateUser({ id, data: formState }));
  }

  function handleEditClick(item: table) {
    dispatch(setSelectedUserId(item._id));
    dispatch(setFormState({ ...item, age: item.age.toString() }));
  }

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div>
      <div className="flex justify-end p-2">
        {" "}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Button onClick={() => setOpen(true)}>Add User</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Enter Details</SheetTitle>
              <SheetDescription>
                <div className="flex-col flex gap-2">
                  <Input
                    type="email"
                    placeholder="email"
                    value={formState.email}
                    onChange={(e) => {
                      dispatch(
                        setFormState({ ...formState, email: e.target.value })
                      );
                    }}
                  />
                  <Input
                    type="text"
                    placeholder="name"
                    value={formState.name}
                    onChange={(e) => {
                      dispatch(
                        setFormState({ ...formState, name: e.target.value })
                      );
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="age"
                    value={formState.age}
                    onChange={(e) => {
                      dispatch(
                        setFormState({ ...formState, age: e.target.value })
                      );
                    }}
                  />
                  <div className="flex justify-end">
                    <Button onClick={() => handleAddUser()}>Add</Button>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Age</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table?.map((item) => {
            return (
              <TableRow>
                <TableCell className="font-medium text-left">
                  <Input
                    className={
                      item._id === selected
                        ? "border-blue-500 ring-2 ring-blue-300 focus:outline-none transition-all duration-200 bg-white"
                        : "border-0 bg-transparent px-0 py-1 cursor-default focus:outline-none"
                    }
                    readOnly={item._id !== selected}
                    value={item._id === selected ? formState.name : item.name}
                    onChange={(e) => {
                      if (item._id === selected) {
                        dispatch(
                          setFormState({ ...formState, name: e.target.value })
                        );
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="text-left">
                  {" "}
                  <Input
                    className={
                      item._id === selected
                        ? "border-blue-500 ring-2 ring-blue-300 focus:outline-none transition-all duration-200 bg-white"
                        : "border-0 bg-transparent px-0 py-1 cursor-default focus:outline-none"
                    }
                    readOnly={item._id !== selected}
                    value={item._id === selected ? formState.email : item.email}
                    onChange={(e) => {
                      if (item._id === selected) {
                        dispatch(
                          setFormState({ ...formState, email: e.target.value })
                        );
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="text-left">
                  <Input
                    className={
                      item._id === selected
                        ? "border-blue-500 ring-2 ring-blue-300 focus:outline-none transition-all duration-200 bg-white"
                        : "border-0 bg-transparent px-0 py-1 cursor-default focus:outline-none"
                    }
                    readOnly={item._id !== selected}
                    value={
                      item._id === selected
                        ? Number(formState.age)
                        : Number(item.age)
                    }
                    onChange={(e) => {
                      if (item._id === selected) {
                        dispatch(
                          setFormState({ ...formState, age: e.target.value })
                        );
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-center gap-4">
                    {" "}
                    <Button
                      variant={"destructive"}
                      onClick={() => handleDeleteUser(item._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant={"destructive"}
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>
                    {selected === item._id && (
                      <Button
                        disabled={selected !== item._id}
                        variant={"destructive"}
                        onClick={() => handleUpdateUser(item._id)}
                      >
                        Save Changes
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
