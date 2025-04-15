"use client"

import { useEffect, useState } from "react"
import { getAtWorkService } from "../../services/atworrk.services"
import type { AtWork } from "../home"
import { IMG, getUserDataFromLocalStorage, priceUnit } from "../../consts/variable"
import { useParams } from "react-router-dom"
import { Avatar, Button, Form, Input, List, message, Tooltip } from "antd"
import { UserOutlined } from "@ant-design/icons"
import moment from 'moment';
import { Comment } from '@ant-design/compatible';
import 'moment/locale/vi';
moment.locale('vi');
import { customerDeleteComment, CustomerGetRatings, customerRating, customerReply } from "../../services/ratings.services"
// Define the Comment interface based on the provided structure
interface CommentType {
    comments: string
    customerId: string
    customerName: string
    artworkId: string
    artworkTitle: string
    commentsList: CommentType[]
    id: string
    creationDate: string
    createdBy: string | null
    modificationDate: string | null
    modifiedBy: string | null
    deletionDate: string | null
    deletedBy: string | null
    isDeleted: boolean
}

export interface Creator {
    avatarUrl: string;
    firstName: string;
    phoneNumber: string;
    id: string;
    lastName: string;
}
const { TextArea } = Input

const AtWorkDetail = () => {
    const { id } = useParams()
    const [atwork, setAtWork] = useState<AtWork>()
    const [comments, setComments] = useState<CommentType[]>([])
    const [submitting, setSubmitting] = useState(false)
    const [commentValue, setCommentValue] = useState("")
    const [replyTo, setReplyTo] = useState<string | null>(null)
    const [replyText, setReplyText] = useState("")
    const user = getUserDataFromLocalStorage()
    const [deleting, setDeleting] = useState(false)
    console.log("user: ", user)
    useEffect(() => {
        if (id) {
            console.log("id: ", id)
            getAtWorkDetail()
            fetchComments()
        }
    }, [id])

    const getAtWorkDetail = async () => {
        const response = await getAtWorkService(id + "")
        console.log("getAtWorkDetail: ", response)
        if (response) {
            setAtWork(response)
        }
    }

    const fetchComments = async () => {
        if (id) {
            const commentsData: any = await CustomerGetRatings(id)
            setComments(commentsData)
        }
    }

    const handleCommentSubmit = async () => {
        if (!commentValue.trim()) {
            return
        }

        if (!user?.userId) {
            message.error("Vui lòng đăng nhập để bình luận")
            return
        }

        setSubmitting(true)

        try {
            const payload = {
                customerId: user.userId,
                comments: commentValue,
                artworkId: id,
                ratingValue: 0
            }

            const success = await customerRating(payload)
            if (success) {
                message.success("Bình luận đã được thêm thành công")
                setCommentValue("")
                // Refresh comments
                fetchComments()
            } else {
                message.error("Không thể thêm bình luận")
            }
        } catch (error) {
            console.error("Error adding comment:", error)
            message.error("Đã xảy ra lỗi khi thêm bình luận")
        } finally {
            setSubmitting(false)
        }
    }

    const handleReplySubmit = async (ratingId: string) => {
        if (!replyText.trim()) {
            return
        }

        if (!user?.userId) {
            message.error("Vui lòng đăng nhập để trả lời bình luận")
            return
        }

        setSubmitting(true)

        try {
            const payload = {
                accountId: user.userId,
                commentText: replyText,
                ratingId: ratingId,
                parentCommentId: ''
            }

            const success = await customerReply(payload)
            if (success) {
                message.success("Trả lời đã được thêm thành công")
                setReplyText("")
                setReplyTo(null)
                // Refresh comments
                fetchComments()
            } else {
                message.error("Không thể thêm trả lời")
            }
        } catch (error) {
            console.error("Error adding reply:", error)
            message.error("Đã xảy ra lỗi khi thêm trả lời")
        } finally {
            setSubmitting(false)
        }
    }

    // Render nested comments (replies)
    const renderReplies = (replies: CommentType[]) => {
        if (!replies || replies.length === 0) return null

        return (
            <List
                dataSource={replies}
                itemLayout="horizontal"
                renderItem={(reply) => (
                    <Comment
                        author={<a>{reply.customerName}</a>}
                        avatar={<Avatar src={reply.avatarUrl} icon={<UserOutlined />} />}
                        content={<p>{reply?.commentText}</p>}
                        datetime={
                            <Tooltip title={moment(reply.creationDate).add(7, 'hours').format("YYYY-MM-DD HH:mm:ss")}>
                                <span>{moment(reply.creationDate).add(7, 'hours').fromNow()}</span>
                            </Tooltip>
                        }
                        actions={user && [
                            <div className="flex gap-2">
                                <div>
                                    {
                                        reply.customerId === user.userId &&
                                        <span
                                            key="delete-comment"
                                            onClick={() => handleDeleteComment(reply.id)}
                                            className=" cursor-pointer"
                                        >
                                            <Button className="text-red-500"> Xóa</Button>
                                        </span>
                                    }
                                </div>
                            </div>
                        ]}
                    />
                )}
            />
        )
    }

    const handleDeleteComment = async (id: string) => {
        console.log('id: ', id)
        setDeleting(true)
        const response = await customerDeleteComment(id)
        if (response) {
            message.success('Xóa comment thành công')
            fetchComments()
            setDeleting(false)
        }
    }

    if (deleting)
        return (
            <div className="flex justify-center items-center min-h-screen">
                Loading ...
            </div>
        )

    return (
        <div className="my-10 container mx-auto">
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-7 justify-items-center">
                    <div>
                        <img src={atwork?.thumbnailUrl === "" ? IMG.IMG_TEMP : atwork?.thumbnailUrl} alt="" />
                    </div>
                </div>
                <div className="col-span-5">
                    <div className="text-3xl font-semibold">{atwork?.title}</div>

                    {/* Author Information */}
                    <div className="flex items-center mt-4">
                        <div className="flex-shrink-0">
                            <img
                                src="https://res.cloudinary.com/dqnxnuqv5/image/upload/v1744473968/gpy5dkxkmykxxlpxyeyh.jpg"
                                alt="Thanh Dung"
                                className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                            />
                        </div>
                        <div className="ml-3">
                            <div className="text-sm text-gray-500">Tác giả</div>
                            <div className="font-medium">{atwork?.creator.firstName} {atwork?.creator.lastName}</div>
                        </div>
                    </div>

                    <div className="mt-5">{atwork?.description}</div>
                    <div className="mt-5 text-xl font-semibold text-purple-600">{priceUnit(atwork?.price || 0)}</div>
                </div>
            </div>

            {/* Gallery of images */}
            <div className="justify-items-center">
                <div className="grid grid-cols-3 gap-10">
                    {atwork?.images.map((item, index) => (
                        <div key={index} className="mt-10">
                            <img className="w-[350px] h-[600px]" src={item || "/placeholder.svg"} alt="" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Comments Section */}
            <div className=" justify-items-center ">
                <div className="mt-16 w-[1200px]" >
                    {
                        user && user?.userId != '' && <div>
                            <h2 className="text-2xl font-semibold mb-6">Bình luận</h2>

                            {/* Comment Form */}
                            <div className="mb-8">
                                <Form.Item>
                                    <TextArea
                                        rows={4}
                                        onChange={(e) => setCommentValue(e.target.value)}
                                        value={commentValue}
                                        placeholder="Viết bình luận của bạn..."
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        loading={submitting}
                                        onClick={handleCommentSubmit}
                                        type="primary"
                                        disabled={!commentValue.trim()}
                                        className="bg-purple-600 hover:bg-purple-700"
                                    >
                                        Gửi bình luận
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                    }

                    {/* Comments List */}
                    <List
                        className="comment-list"
                        header={`${comments?.length} bình luận`}
                        itemLayout="horizontal"
                        dataSource={comments}
                        renderItem={(comment) => (
                            <li>
                                <Comment
                                    author={<a>{comment.customerName}</a>}
                                    avatar={<Avatar src={comment.avatarUrl} icon={<UserOutlined />} />}
                                    content={<p>{comment.comments}</p>}
                                    datetime={
                                        <Tooltip title={moment(comment.creationDate).add(7, 'hours').format("YYYY-MM-DD HH:mm:ss")}>
                                            <span>{moment(comment.creationDate).add(7, 'hours').fromNow()}</span>
                                        </Tooltip>
                                    }
                                    actions={user && [
                                        <div className="flex gap-2">
                                            <span
                                                key="comment-reply-to"
                                                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                                                className=" cursor-pointer"
                                            >

                                                <Button className="text-blue-500">Trả lời</Button>
                                            </span>
                                            <div>
                                                {
                                                    comment.customerId === user.userId &&
                                                    <span
                                                        key="delete-comment"
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                        className=" cursor-pointer"
                                                    >
                                                        <Button className="text-red-500"> Xóa</Button>
                                                    </span>
                                                }
                                            </div>
                                        </div>
                                    ]}
                                >
                                    {/* Render replies */}
                                    {renderReplies(comment.commentsList)}

                                    {/* Reply form */}
                                    {replyTo === comment.id && (
                                        <div className="mt-2">
                                            <TextArea
                                                rows={2}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                value={replyText}
                                                placeholder="Viết trả lời của bạn..."
                                            />
                                            <div className="mt-2">
                                                <Button
                                                    htmlType="submit"
                                                    size="small"
                                                    onClick={() => handleReplySubmit(comment.id)}
                                                    type="primary"
                                                    loading={submitting}
                                                    disabled={!replyText.trim()}
                                                    className="bg-purple-600 hover:bg-purple-700 mr-2"
                                                >
                                                    Gửi trả lời
                                                </Button>
                                                <Button size="small" onClick={() => setReplyTo(null)}>
                                                    Hủy
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </Comment>
                            </li>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default AtWorkDetail
