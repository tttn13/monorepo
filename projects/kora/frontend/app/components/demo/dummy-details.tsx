export default function DemoDetails() {

    return (
        <>
            <form className="p-6 bg-white shadow aspect-square w-[300px] h-[200px] rounded-[20px]  text-10px">
                <h4 className="font-bold mb-4">Enter Guest Details</h4>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="input input-bordered flex items-center gap-2 text-10px h-[30px]">
                            Name
                            <input type="text" className="grow text-10px" placeholder="Daisy"
                                id="name"
                                name="name"

                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="email" className="input input-bordered flex items-center gap-2 text-10px h-[30px]">
                            Email
                            <input
                                className="grow text-10px" placeholder="daisy@site.com" type="email"
                                id="email"
                                name="email"
                                value=""
                            />
                        </label>
                    </div>
                    
                    <button type="submit" className="btn btn-primary min-w-full text-10px">Schedule Event</button>
                </div>
            </form>
        </>
    )
}