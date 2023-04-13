import { useEffect } from "react";
const Settings = ({setActive}) => {
    document.title = "Settings"
    useEffect(() => {
        setActive(()=> 'settings')
    }, [setActive]);
    return (
        <>
            <div class="m-4 overflow-auto ">
                <div class="flex justify-between border-b-2 border-black bg-white">
                    <div class="flex items-center">
                        <svg class="mx-2 h-10 w-10 rounded p-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="currentColor" >
                            <path fill-rule="evenodd"
                                d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                                clip-rule="evenodd" />
                        </svg>

                        <h2 class="font-bold">Account Settings</h2>
                    </div>
                </div>

                <div class="flex w-full space-x-4 py-4">
                    <div class="flex w-2/3 flex-col space-y-4 ">
                        <div class="items-cneter h-full  border-black bg-white shadow-lg rounded-md">
                            <span class="pl-2 font-bold">Display</span>
                            <div class="border-t border-gray-500">
                                <div class="flex justify-center">
                                    <div class="m-3 w-full">
                                        <label for="displayname"
                                            class="form-label mb-2 inline-block font-semibold text-gray-700">Display
                                            Name</label>
                                        <input type="text"
                                            class="form-control m-0 block w-full rounded border border-solid border-gray-500 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-black transition ease-in-out focus:border-2 focus:border-black focus:bg-white focus:text-black focus:outline-none"
                                            id="displayname" placeholder="Displayname" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="h-full  border-black bg-white shadow-lg rounded-md">
                            <span class="pl-2 font-bold">Account</span>
                            <div class="border-t border-gray-500">
                                <div class="flex w-full">
                                    <div class="m-3 w-full">
                                        <label for="accountemail"
                                            class="form-label mb-2 inline-block font-semibold text-gray-700">Email
                                        </label>
                                        <input type="text"
                                            class="form-control m-0 block w-full rounded border border-solid border-gray-500 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-black transition ease-in-out focus:border-2 focus:border-black focus:bg-white focus:text-black focus:outline-none"
                                            id="accountemail" placeholder="Email" />
                                    </div>
                                    <div class="m-3 w-full">
                                        <div class="">
                                            <label for="accountpassword"
                                                class="form-label mb-2 inline-block font-semibold text-gray-700">Password</label>
                                            <div class="">
                                                <div class="relative">
                                                    <input type="password"
                                                        class="form-control m-0 block w-full rounded border border-solid border-gray-500 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-black transition ease-in-out focus:border-2 focus:border-black focus:bg-white focus:text-black focus:outline-none"
                                                        id="accountemail" placeholder="Password" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="h-full w-1/3 bg-white shadow-xl rounded-lg bi bi-image-fill">
                        <span class="pl-2 font-bold">Profile Image</span>
                        <div class="border-t border-gray-500 flex justify-center items-baseline pl-7">
                            <svg class="h-auto w-56" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
                            </svg>
                            <a href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="h-6 w-6">
                                    <path
                                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                    <path
                                        d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                </svg>
                            </a>
                        </div>
                        <div class="my-4 flex items-center justify-center space-x-2">
                            <button type="button" id="account"
                                class="rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-600">
                                Save Change
                            </button>
                            <button type="button" id="account"
                                class="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-600">
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Settings