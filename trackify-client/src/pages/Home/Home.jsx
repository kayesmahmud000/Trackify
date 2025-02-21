import Navbar from "../../components/Navbar";

import TaskBoard from "../../components/TaskBoard";
import { TaskProvider } from "../../context/TaskContext";


const Home = () => {
    return (
        <TaskProvider>
            <div className="max-w-7xl mx-auto p-6">
                <Navbar />
                <h1 className="text-2xl font-bold mb-4">Task Management</h1>
                <TaskBoard/>
            </div>
        </TaskProvider>
    );
};

export default Home;
