import { Button, Col, Row } from 'antd'
import Title from 'antd/es/typography/Title'

import { ArtistCard, DesignCard } from '../../components'
import { getAtWorksService } from '../../services/atworrk.services'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export interface AtWork {
    title: string;
    description: string;
    fileUrl: string;
    thumbnailUrl: string;
    price: number;
    likeNumber: number | null;
    creatorId: string;
    portfolioId: string;
    categories: any[]; // Hoặc chỉnh sửa thành kiểu cụ thể nếu có
    id: string;
    creationDate: string;
    createdBy: string;
    modificationDate: string | null;
    modifiedBy: string | null;
    deletionDate: string | null;
    deletedBy: string | null;
    isDeleted: boolean;
    images: string[];
}

const Home = () => {
    const [atworks, setAtWorks] = useState<AtWork[]>([]);

    useEffect(() => {
        getAtWorks()
    }, [])
    const getAtWorks = async () => {
        const response = await getAtWorksService();
        if (response) {
            setAtWorks(response);
        }
    }
    return (
        <div className='container mx-auto'>
            <div className='h-60 flex items-center justify-center'>
                <div>
                    <p className='text-7xl font-thin m-0'>"God is a design"</p>
                    <p className='text-center mt-2'>Thiết kế là nghệ thuật, portfolio là câu chuyện</p>
                </div>
            </div>

            <div className='w-full flex justify-center'>
                <div className=''>
                    <Button className="bg-red-500 mr-10 text-white">
                        Nổi bật
                    </Button>
                    <Button className="bg-red-500 mr-10 text-white" >Xu Hướng</Button>
                    <Button className="bg-red-500 text-white" >Mới nhất</Button>
                </div>
            </div>

            <div className='px-24'>
                <div className='border-solid border-2 mt-5'>
                </div>
                <div className='border-solid border-2 mt-2'>
                </div>
            </div>
            <div className='justify-items-center mt-10'>
                <div className=' xl:grid grid-cols-4 gap-10  ]'>
                    {
                        atworks.map((item) => (
                            <Link to={`/atworks/${item.id}`}>
                                <div className=''>
                                    <img className='w-[300px] h-[300px] object-cover object-left-top' src={item.thumbnailUrl != "" ? item.thumbnailUrl : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMVFRUVFxUVFRUXGBgXFxUVFRUWFxUVFRcYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK//AABEIALcBEwMBEQACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACAwABBAUGBwj/xAA+EAABAwICBwQIBQMDBQAAAAABAAIDBBEhUQUSEzFBYZFScYGhBhQiMrHB0fAHQmKS4RVT8WOCoiMkJXLC/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQIDBAAFBv/EACwRAAICAQMEAgEEAgMBAAAAAAABAhEDEiExBBNBURQiYQUykaFxgUJSscH/2gAMAwEAAhEDEQA/APK2Xpo8V7BsJR2Cmx7ZDml0RKLLJeRmsUFFId5G1uwbFOqQj1MhjCKbFcV5FlgzTpsi1ErUTJiNDo4bpXKiscerghhPeipCyxVwVZMT42GxOSuJbHkaNbHc1FxNscg+NozUZ36LwcX5NMUB4C6zTyJ7PY0xg0YtIE7rDwWzplGrR5/WSlwcp0a22eS4lBiIEmjVThRma8RuiICyzi2j0Mc0hsmIUYx0s0uWpGJ8a1J7GKURZjTWSlEJjUsh4UOI5KBpt1sgQzMISfphir5GCEKEsjLLHEF0QXKbaOcUitRK5BSBc1KpOw0mYZ1thuYMzo5szrrSlR5s5WxBamJgkIHIGy7cJ7UaNjdyXgrq8sUfTPpMUvAibQx/IcFqh164kjNk6DzFi36Glte3xVo9fi4Iy/T8gtlE4fyqPqIMWPSTXk0GlIGKRZlJ7F3h0x3ESM5fFXi/yZMkXXAnYnJW1r2Z+0+UibLkU2oXQw4o7cUsmPCNPdmpjQVKTkjTHTJ0HLRDNLDM/R2Xpo1yYzEtSkYXCuA4QukrQ0LR0YGArHlckeni0s6MLxax4+K86cXdm6MkY6qDWuGha8GTSvszNmxueyRy56Jzd4svQx5oT4PJy9NOHIDIMwnlL0JDH7OjSxNOGqe9Yc85x3s9PBDHLbSPlga3cbnIcO9QhknL92yNE4Qj+3cos5ffehasNOjNKFogZ8mwkQkqkppEVjlI0R0uazTz3waYYKW4ToxwupqT8lWl4ADQN66Tb4AqRZOQU69j36FOjTdxC6SWU5MZIF4sMUFcnSGdRVs49VJc4L1ccNK3PEz5db2MwpydwTvJFEI4pS4RfqTsikeaHsddNke1Bf05yR9TAr8KYs0ncj3EK+na2PYQSBeDKLPpFJUOjlB3JXFoKkh7tIWFhcZ4BdHF7OeQxVModvHRasUXHhkJtPwIAyJV075I0/AuSIXxv1V4TdbEJ443uNp6K+4lLk6lrZofH0y5TND6NgHtEXUY58jexaWHEluYXRDgPFehGTrc86cE3shsUIHepzyNlceKKCeOBF10V5TOm7dNCtkr6jO4FinXdxHdl+BrICpyyxKxwyNcLiBZZckYytmyEpJUanTG3Dw3rMoWy7nSObVNLl6GGomHqE5oxWI4XWvZo8/7Qe6NcUxIxsss8UUzbjzykqY4OvuCi4VyzRGbfCIWu44IfV7oZalyC+LxXRnYHFIpvgF0qApMCV4GaMIWLPKkZ5J1WOGjPLqbFGRNoEWVhseVGcFyXhlfAwNJ3ELPJpeDTHfhjGQHl1UZzRaMGKko3OOJwVIZ4wWy3I5MMpvd7BN0eziR0H1SS6mb4Hj02NBinbn0UXll5LLHHwKfEP8AKKkztKEuATWxaSAOrkELkJ9fQLZyN4W3tRkuTEuonHlGmKfvUZYkacea96NcdSDvxUZYpLgusyY5rQ7ckvTyPV8DhTWFz/KHcvZDaUt2Y5psbBvjvW3Hj2tsw5czuookbHuwDgL+CaTxR3aEUcs9tR1aTQTSLue2/f8AysuTrpX9UbIdHBfue5s/ozAMHM/cLrP8qbe9luxBcUZZtGN3OuDmLfVWh1UlwSydPB7MW3RJ/Kb8rj5qj62+RI9IlwxxoWD38Dlh8ki6ib/aUlhh/wAhM8cY90E+arCWSX7mSkoL9qM7mZ3HkrKT8EnFeQhHzS9x+UHQvDIWlcpLkLTZppqMOGIIyUsmaSezKwxJrdCamha3BNDqZPcSfTQXKMj4tVaY5O4jNPH23sMZMkniTGjmYuSoKaGFUJPO0xL5ieCrHGluSlnk1QsEp2kSUpC5CSjGkLKTYAYMlzbo6KV7ohivuSOaXJTQ3+0RIAnVsjJpAsJ4YISS8ghKV7G2mqABY+aw5sMpStHpYOojFUwZJBwJKVY5eR5ZYvgASFdKC8HRm7K2xSPGhlldgPnXLFZzzCtojKFCrJYReFLTIpqiaGt5pnO/Byg1vY0uwQjyNPgUGlaNcaM2mV7HSgszecbYD6rJNvI9jbGsa3ESVJWiGFGXJnfguOa+Fk0sdbixzKWwyM2xB8yhLdcDRdb2boHnib+KzSSNUDdEHdrzUpNFYxZsp6e5uC2+RtbzUnLYoo72bZDK0YNZ8vIpFpflhblWx5+scXH2xjkDh0W/H9V9WZMn2/cIaMcAB95qje25Nc7D3xg8/gpxlRVxTFuibwFu6/zTa35E0LwC+MpozQrgxlK5wOF/BJPSxsbYelfSOigcyKolEb3gENdrHAmwLiGkNHM2WZY8l3E0PJBbMfV6MNtZvtNONxYi3eN6fHn332Ys8Po5r6ZbI535MssC8CHx5qscjrYhKCb3L2I4fNK8zvcZYotbAerffBc86YFgaLFPzHgkedeB1gb5ZXqBui+r2B8P7ElhA4+CnGcm+B5wjFcnOniviFthkrZnn5cep2i9jgpvKrKRwurFSQ4EpllV0hJYW4tszNuFaVSM8ZSgwjNyU+3RX5DrgoSpJY1yNHOwTIEO235H71Akk7ghUY8h1znwTYHNT78Rvj5PZ1dgsKyp7HovE/BAE9i20E0hduBSiw2sXamPoTC2ITrM0I8EWWKfJP8AIvkn8auDSzV4i5UnJ+GXpLlD2ztG4fJLTYdcUMbpA8Au7IvyBprnO+8UvbSH7rkUKp4wDiPFHTFnapCHkk4kqqaXBN2+ShGjqAoGhjBzSOTZRRSHxtGRSNsdUGS0C2rfyQ3fkO3oz2HAWTWLR8X/ABGx0hMQQQRHaxBtaNoIIBNjcHA/Nasf7UZp/u2Ps/o9puL1aFsOpIyOOOPWBv7jA3G244blhyYW5Ns1RzbUgqyqDzg0N7k8IafIsp2ZdkTjqk+BVtdbWR0Pmh0ZANrDwG7qpNtllSCe1m+3zSqUgtREumA3D4BGrFcqEPqU6xtiPNFGV5B4KquPkg5KT4DigvyupTylceJMkkVsEimnuWeOtjLKL7uitCdMzZI6uDK6FaO8jI8L8gmNd3rD2q8FavJTcm3yOo6VwAIh4rpZnwCOFcl2soSlqNKjpQ9tG8i+GKk8kSqxTasayUpXFMEMr8j2Oad48Um64LqUXyG6mHA3RWV+QSwrwL1bKqlZPTQxpKDCmxrClasZOhzXJafgdSQ1rWnJDVJDaYsLYNTLLIR4Yk9WHApu6/IvYXgp1M4IrLEV4ZLgtgI33TarOSa5D1QeI8cF1hpDWxOtcbkupDaWNaD3oakMkwi05FDUGmcz0kncykqHsuHNhkLTxBDDYg5p4byQk9os/Pq3mM9J+H1c6OtjaCdWW7HjP2SW+IdbHvzU8iuLGhyfZGG2RvmPmsj3Lx2Bkvl8ULOd+hTg7mjqEaYwggb0t2Px5FawRsGqJmljyVoZfZDLhvdCiDkm1x9knGaXBbJSFOSTRSGRp8Gt8lxdZOGb7tWZ9QJ9bE0qxcjOSZT9glAW6LC67uA7ZlkCpGfszTh6FWKdyi/IkVJPgONpJtZQnKkasabe50BWAYZYLLRsTS2FidvZCf8A2Zda9DNq3s2Pejbvka4vwEMwPvmjfs6n4QTZc23Xf4YdXtDGyMyKO51xGNkbkldjLSGJG9ldbDt6GNe3gD4IamNVDWSNyPkgwoMvHZ8VyYX/AIDa7ILgIJmO8WXN/kKXs1yUTALu35bkiyy4Q7xRrcx7LH2R5lWWT2SeP0RhdvsOtkXJCqLHCc8R8CkHTZw/TmqDKCpOIvGWbv7hDLf8lXBbyITLtBnwRemYKO96Bj/yFNf+4PgVPM6xsfGvuj9CChDm4YnvC8Z5pJnpKESNo7b/ACSSytlI40jDXBo3fynx5H5J5IHNfGDuWhZDJLDYhzU2tkXioAoWwqLQJK6w2gHFdqQHRQeusaLIZBdd4oe7YyOQcVORWIyVwISooYntam1snoRme0I9xiPGgmgDvQcmx4wSBLRn5hCxqNLTHkUlsDxx9DmxRHcXDohqaO7MXwaI6HJ334JXlHjhrgY6Gwxt3ru4h+2xb4f0orMhXgsjIm3sT4Dej3QLDQxkFzh52CDyLyMsbNOq7c5tx97rYIKSfAdLXJYiHC/dkjrO0nQh3C9j5KbkUSNG2aB7tuh+KW2zqosVnIjwA+aNHWQyg7z1S20MlYJjB3buWC7uMOhChQgnA9cE6zk3hXJpOii3HW8vmu76YsUnweC/F2qEdGI8LyyNHgz2zxwxDeq3dD9pt+iHVbRr2fGF6hgPQ/h+y+kKfhYvcO9sb3D4KWd1jY+Peao+9UoD8HtA5twXiyeng9GC1coc6N7PdcXDI4qbkpclFFx4MNXICDcElCmnsNqTOP7R3FaE1RCS3Lcw8bo6ibihWoTu+abWieht7EdTP7JQ1x9ndmXozyMI3ghdqQjxP0Le05FddgeKQrWRTAotE2qLZRFiYD7+iQqnQD6ofZKKsOtGd9QjQrmKdUJqJvIwNqUKR2qRmg0m4fd10sCo1RyM6UWmLj2rLK8ck9iqaaHjSrV2mT5DSRqh0kx29w8wkkpLwNFX5OgydpGDvmouTH0A7VoN8L57kNTYaofFXMOFwuto6kaYphu3jJC2GiPiacQSEyyvyK4LwHDGe0Qg8oVAfqOHG6XuDaAjCeHxRWUXtminY7iErnbDSSGshx/L0I+ZQcxLo3wU7iPohrZGeRLYqecNvrbkNaDDG3weQ9MPRptdAQ/WYY9aSLVIuTqEAPwOBNt2OC29H1jxTr2d1GJSVeUfnxfSnkn0r8H9Atc51XJc6utHG3d7RA1n344OLbcyvM/Ueo0JY153NXSYNT1n1WQMyA714vdZ6SghNQ67bA25jBLr8j6Njl1MwvhclaYT2IZIb2YpGG+OH3kq9yJF45eRYa7hfwTdyIvakLfMQcRj95Ipp8AakuQoqwjc0d/HrdLLT5Y8VLwjQNJgD2yCchioPn6mhJ1uYptKg7tyrGDQkmZHVV8lVPYk4meaqtw6J40xXH8Gb1gngeiLivZLSwRJ39ENK9naGC+ZOoINUKM/cEXEFF+ufqC7Sw7nFbOtTiCxzalK8aGUmh7armovFTtFNdhtl5hK1fhhQbKsjihLp0+AxyUOZpEjcSoS6Oyiz0aW6VzAPkeqhLpJIrHPFjo9KW90keKm8DXJRZE+DdF6RSDn5qT6f8j6/wAGyn9KuDmgc7/JLLp5VsxlOL5N0WlScWWPff4hQdrkpos0sr3u4DwJSSmgrGb6esvgQR0PRLrJzw+TrUlS3cb9+CHcMOXHJHZo5L+624zuPkVp6fVOVRjZ5+RVywqmJpxczH/1VOoxzh+6Nf6BjnJbKX9nGrnNG4EeXxCydxJnoYVKXJ+X9IURbNOxtv8ApOk6Mfq4fe4Ffb45aoKXtI8ycabXqz6j+Hek4m0EY1w1zHSB+/3i9zhf/a5q+e/VI5PkOltSo9j9PUXh/wB7naOntY2BaRndYNEktzbpXgXX6VIb7OJO+xHxKbEre4s4Otjku0sRjqv8S36rT2b21L+yN1ymC3S7d7ta/wDst8bovp5raNf2Lri93/8AAjpgne8gc7D4JPjzG1xMsmkWH8/mqxw5V4Jynj9inVzOL/NMsWXxEGrH7FSVjLe8fBPHDlvgDljrkwSVYG4u8vqt0MU3zRlnOK4spuk+/ojLo2+BY9QvJf8AVRzSroZDfJiKk0weAVofp18shPrEuEZnaUPPqVp+DH2Q+Z+BUmkCeHmfqqR6NLyTfWX4E+s8j1T/AB68oT5SfgnrIyd+7+F3YftfwD5K9P8AkESqTgaVlD23NJ2xu6ghUDl1QcB1kQXrAH+UNDD3IjRVN5dVN45ex1lxlOqm58eXJFQl5Oc4eGMbVDMdUHjbCskF5DbVN7QHipvFL0P3YeGH65+seSX48fMQ99+JBt0h+odQkfSx8IddS/LRpi00R+cdVnn0Cfg0R61Lk3xek5HFn7lml+m+7NC6+P4HRelrv9P91vmpv9NXpnfMT5r+TpUnpu9vGLxf8lKX6b6v+BJdvJzX8nrNDenuuQC2LnqOxPgqRz5OljtH+qIS/SozTkpE9JfSxl/d6zPZ5NcAll1L6t3of8tj9P8Ap7xxtyX8J/8Ap4ut9JmO427qh/zJTx6WXNP+Ctxh5X8JHzSrYDPPjYWlcMb31he1+O9fR421jjt6PFypPJLf2b/RuXVid7VrvJte3AC9vvco9VBSkti3SSqL3Omau254H+7+VKOKLW6Kyyvwxbqz9f8Ay/lUWKPol3X7/sU+p/UP3fyisaXj+gPL+RZqP1DqqKK9COf5KM/6h1TqK9CSn+QDKO0OoT0vRNy/IO1HaHUJqXoXU/ZW3HaHULtMfQO5L2U6YdodQmUYehXkl7FmX9Q6qiUPQjlP2CZf1Dqn+pO51yVtv1DqF1RBc/YBlHaHUJk0JKMmCXjtDqjaJ6GVtB2h1QtBqS4K2n6h1XXEFSN7YRyXmubPYUI+hjYO7ohqYyivQ1tOLcEjyDaEEKcZDog8jCoL0N9WFuHRT7rH0IsUt/8ACHedHdtPwMbRjLyU5dRIdYo+hraAZeSk+ol7KLDH0NGjWnh8EvyZ+x/jwvg0RaJafy+QU5dVP2Uj08PRtp9DR9gdB9Fml1eT2Xjhxr/ijbFoeLjGz9oWeXV5VxJ/yXjjx/8AVG+m0HD/AG2ftH0UZdVl/wCz/kbRjS/ajsUWgYP7Mf7G/RSebM/+b/ky5JpcJHstD6NgbbVhiBHEMaD8F6H6bK8yU9/8ni9RknvTZentGwv9+KNxzLGk+YVv1f6Zkse23jYHS5Jra3R4rSXo9T4/9GLH/TblbLJeXHPnXE3/ACe3hlGXKR8a0w2P1yqaGgNjjla0NFhdjbXsPFfWdO59jG2921f+zzOo0d+e2yT/APDf6I6PbNTklou15be2/AEfFZ+vzyxZEk9mi3RY4ZMW63s6R0KL2sOiz/NlXJf4kfQFToVoF9UdEYddNvkSfSQXgxO0Y3sjotMesl5IS6aPoD+lNP5R0TvrKJ/FTKOiG9kdEV1gH0i9Cn6Kb2R0VF1afkm+lXoH+lgG+qOib5a9g+KvQB0a0flHRMuqsHxl6FSUI7I6Kkc5OWBCvUW9kKneRP45R0eOyj316A+nYBom9lOssWT7TQs0jeyqKUScoyANK3JH6sm1NE9WGS76nJSZPV29kI7Hfc7MUS8lyo9dbmqOFQllHUR4gUnlKaRkdOlllDGJqbR4Y/BRecqoBtpikeUZRHR0qm8hRJGmOlU3lHo2RUv3dTeQZGmGnHJTlJsZMcyLFIwqRo1EriMpm2nsk0jOVnSp5Bgu0mXJFnZoauytilokmefmxWVpKvBviq9Rl7s3I7p8DRxZZQ5ZaR6MIOJ+e9Izg1VW6/vGotz1n2HkV9pii1igv8HjZJ3kn/s95+GdJ/2mt23uPSzf/leH+rNyzf4R6P6e6xHppaIZLzdzZqMtVSiyMW0zm7OU+msVoUmyMpUL2VuCem9xddFbEZLvsd3EZpYgqwUiU5oDY8kXaOjJMF1LcYBcp0xqtGJ1KclsjmpGeUShTIyysCSKdEljkkznSA2IVtckT2E+qhU7jE0oVLSpllYrhFiTTFP3n5F7aJsTku7rF7aO1HTcl58ps1o2RwrO7KJmhsAU22MgxGAlaYyY7Xso6JMfWCHDWTduVHdxGhhCHbYdY5r7c13as7uEdKmWIV5DRFuQeMZSHXICChYdZW0P3wTdsGtmqCY8VOWMpHIPZVYpHiG1m6nrtyXtsV6Wa6iUWxIXaQRSR5uv0mImvJycRa/AX4BWxdPqaDPLR8EdISSeLrk+JvjmvrarY+flK3Z9L/DbSQEGpxa53jc3vv55Lxv1DA5ZNR6HS5ahR7MVOtl4Lznio19ywavck0WPrOXUhXjFJEZOznOfitUYKjPOTsEnmjSEtgghHYKY6MBSmmUi0XtAN6i8V7le6kZ5y1UjjkuRJ5ImRzwrLYzvIKfZMpJcAcrFFi5yfg4XqoamKCU6mzrAKNsDkWLI6w2dATKO52sYJ0GHUNFQupDqZe3C7Sju4VtrrqS8A1hCRc2g6mE2YrqTCptDtqjoQ2thiVHQgajbDU232UXjsqpmr10cj99yRYmPrRBUtP3ZFwZ2pMbI8AXCRKxnsZjWKnaE7gkVfM9B9VRYkJ3GafXnHe49G/VJ2l6HWT8nl/TuoIhDsSNaxtk4WxIWzo4fYz55/U+Zr1Tzzv8AoRUatWxvB+s0/sJHmFn6mN42/RXC/ukfWoWaovuvkCvDk72PTjGtyOx3kpG64Hqzn1rrYIwi5M6TUUcoha7pUY27BdIu0tk3KhbnplASUgC9HSLrYLnldpOc2AXLqBqbBRrY5J2WG3UXyVSGBioo0hwHpqRzEPQdA2AMa4DSB2aNyBoQ3aru1SJLJYwPHNTcWit2HrIBK1lRRFCbL3LnjOUkMEwS6GPqCbIEKCmOE33ZEaxjZfuyJyCMqB1kM4zCamC0U2q5/fRc4sKmaHaQJFiUnaQ3dEmZMJqCZJzQCmNDwiMcf0vOtSSDLVcPB4+V1fp3WREs28GfNl6JiOl6NyatVCf1jzBCnmV42NjdSR9QOkXatl5Dxpu2eiszojK8/ZCV4k+ArK/Jnqau/wDkJ446VCZMlmN71WMTNNsUXJ6JbsEuXKIeOQDIjpBqQJkXaQakEFKTrZFoR2solL4HrcJsgCCT5GtIN84snsN7GV86PbZN5EJdInWIn3LYccl8MEsouJSMrIXFJ9h9wAVWTIxgkFrpVGxm6IZSqxxpE3NsgcmaRyTYYclHWwQepyTfAU0GJEO2xtSDEy7tM55EQzJ1iXsR5CxMUe2ga5F7U5lFRQNUixIjpCpFmVdoOchjZFOUUOmObIpNUVTLdMUEjrMGmZL08oI/I74YKuJfdCTf1Z85uvUMR0vR6JzqiPVaTY3NgTbA2JtuxU8rSi7Gim3se6JI94Ed+Cwvfg0K1yA6TmuUWuTrsW45phKbFTVtsGsc/mBh/wArIRx723QXJJVyG2XDdbkd65xOtCnvV4RVGbJJ2BdMxA2WUJtovCKfI6R6y1ua72M20WjRsQc1YLpkyxIV5PyAZuabtfgHd/IDnp1Ek5WBrIsEQg+ylKNl4tI3xvaQCSOqztM0qSaOdrrUomXUXro0C/ZGvTaWBSiMBSOvI6TIX808Yitv2UJO7om0ULqsc2VTcF5KKQ5j7qUvrwVW5obEFHuyH7URghbmR4FHXIOiJTqdvAnpYeaPdkB40zI82O9aYPUrISjTBD0wisc13epMsg2zgZqbg2MpJBCqABxQWGV8DdxUIe8OBB3EEc8VXQ4ompKR4jS1OI5XMBJtbE7zcA/NbMctUUyE1To9vovQccIa9j3+0AfafqtNxkBzXn5M0pOmjZDEoq0xlSbH3mnuJPxTY7J5EjNtjmr6EyGtpjGTcrqMoPwyimgnVPJIsL9jvIAZQjpkjrTA1hmjcl4BSYp5VYuyMo0LE3JUeJvyTWSizLySdutrK9zyKfInjHeic5WrQgzLR2zM5srbodpHdwm2XPGFTB2q54/IVN8Bh6jKJWMrCD1OimoBsiq4eiamGXpVEdv0RrimdAVjozmoZG1waIq+S3N5BdHJvyJLHtwLLwFdJyZJ1EjHjNNJNI6LTZvghJ3WWKc0zXCFGlsRHEdVB7lKaKEmOK4JrZUjdrAd911DWc6r97DFacLVUzNkT8CHOtvVVutiT2e5DMuUBtRHTArowoEp2AZE6Qg6AXUss9JXHGzk6Z0Tryl4dYG2Fr7gBnyRwZPrXoGWO9nQ2oa1rdUey0NvnYW8E0MVybsE8tJKhe25K/bryQ12AZU6ghJSJtjn8UO2vQNbKEq5wRymyGXuQ7Y2sHbm6LxpoVZJXsGaj7uo9pplu7aM0ky0xgvJklIgmXPGgqZNY8En1T3H+zWwNs0XNeBdDXKIl1DKJEHIKiUShYdIJKNpA02WktB0sNrRkg5u+Sqgq4DYEkpjwghgKR20UVIheiogcqIJl3b3O1i3vV8caIzdhRFDJIaEVZsbWlvAdSsqxJvk0PJpQf8AVXkYNHVP8aPsXvuuBPrT9+quWDH7O7svRZ0g7sM6J100PYjzteBDqx3ZCrHBBLZk3ml6K9a5JuylwK8tk26KxnOYQlSuNBRZelSGLbWFvBCXTqYY5tIiasviQqQ6ZJbMlLqb8FGoJVFjURO5qLa9LKxkgnIKbC4pgOTRmK4gJ7EoFxRTBJAhy5ipsheuOZRK66OpsgaleRIMcUh8XesuSSb4NWOLS5I5KmkNJMENKLmvYqg/RLIakHSyiF1o6mAU9i0wlOhqDa5Sk/JdBay6m+DrSDJbbignNnNREvfktMYtfuITafADnJ4qycthZlVlARyLbUFB4kxlkaCNUUFgSdheZvkXtSq6UR1sJsxO8oaIrhDqcnywjJbigt+UFuihWOC54YsXvSRPWnHeuWKK4O7smG2QrnSHVsa0qEpFVEhm4WXKN7gcl6ETSZK+P8kcrrgVrKpCrHMKjKTNEIqgjzSqV8DuNbk1lzOBc8ZoqIrKEgzQcWBFlyTgZqyinUxXEBNqAohBIxkiXSDIgKDCinm24owp7MEk1uimzHmmliQFkkGJFHQiimUZFyic5A66Olg1AmUc0e2wahgJU6iVuQqUniSrwp8IjNvyxZf39VZREcig5M0EPaBJpdncgFyohWitZEUl1wC2lcxkgg9AJHSrkhZSsHWTCFgrgpDWPUpItHY0Ndgsz5NC4sRLIVoxxRnnJiHPKskiLdlBy4CGsk5qco2Wi6QZlSaKdjudlay7yAAuTpCvcHWTADa9JJDIMuU0hig5CRyLJSoIJcmoBeslYStZCqOESFaIPYnJC9Y5p6RO2QuXUjrZNoUNKDqZNddpR1n/2Q=="} alt="" />
                                    <div className='mt-2 font-semibold'>
                                        {item.title}
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <Title className='text-center mt-10' level={1}>Khám phá những thiết kế sáng tạo</Title>
            <Row className='mt-10'>
                <Col span={6}>
                    <DesignCard
                        title='Premcar - Premium Car Rent App'
                        image='https://images.ui8.net/uploads/6_1729479362712.png'
                        _id=''
                    />
                </Col>
                <Col span={6}>
                    <DesignCard
                        title='Premcar - Premium Car Rent App'
                        image='https://images.ui8.net/uploads/6_1729479362712.png'
                        _id=''
                    />
                </Col>
                <Col span={6}>
                    <DesignCard
                        title='Premcar - Premium Car Rent App'
                        image='https://images.ui8.net/uploads/6_1729479362712.png'
                        _id=''
                    />
                </Col>
                <Col span={6}>
                    <DesignCard
                        title='Premcar - Premium Car Rent App'
                        image='https://images.ui8.net/uploads/6_1729479362712.png'
                        _id=''
                    />
                </Col>
            </Row>

            <div className='text-center mt-10'>
                <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-2xl text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Xem thêm</button>
            </div>
        </div>
    )
}

export default Home
