import random

class MongoLearningPath:
    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)

def get_learning_path(db, path_id: int):
    path_data = db["learning_paths"].find_one({"id": path_id})
    return MongoLearningPath(**path_data) if path_data else None

def get_learning_paths_by_user(db, user_id: int, skip: int = 0, limit: int = 100):
    paths = db["learning_paths"].find({"user_id": user_id}).skip(skip).limit(limit)
    return [MongoLearningPath(**p) for p in paths]

def create_learning_path(db, path, user_id: int):
    path_dict = path.dict()
    path_dict["user_id"] = user_id
    path_dict["id"] = random.randint(1000, 9999999)
    db["learning_paths"].insert_one(path_dict.copy())
    return MongoLearningPath(**path_dict)
