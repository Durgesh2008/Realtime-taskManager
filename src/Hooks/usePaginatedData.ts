import { useState, useEffect } from 'react';
import { ITableRow, TaskStatus } from '../components/Tasks/ITasks';
import { backendUrl } from '../constant';



interface UsePaginatedDataProps {
    url: string;
    page: number;
    pageSize: number;
    queryTxt?: string;
    status?: TaskStatus
}


const usePaginatedData = ({ url, page, pageSize, queryTxt, status }: UsePaginatedDataProps) => {
    const [data, setData] = useState<ITableRow[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalTask, setTotalTask] = useState(0);
    const [totalpages, setTotalPages] = useState(0);
    const urlMaker = () => {
        let base = `${backendUrl}${url}?page=${page}&pageSize=${pageSize}`
        if (queryTxt) {
            base = `${base}&search=${queryTxt}`
        }
        if (status) {
            base = `${base}&status=${status}`
        }
        return base;
    }
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(urlMaker());

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await response.json();
            setData(result.tasks);
            setTotalTask(result?.pagination.totalCount)
            setTotalPages(result?.pagination.totalPages)
        } catch (err: any) {
            setError(err.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [url, page, pageSize,queryTxt,status]);

    return { data, loading, error, totalTask ,totalpages, fetchAgain: fetchData };
};

export default usePaginatedData;
