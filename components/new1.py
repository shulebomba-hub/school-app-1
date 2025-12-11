def family_tree():
    members={
        "Me": {"father": "Olaf", "mother": "Lili","gender":"male"},
        "Olaf": {"father": "Lars", "mother": "Kate","gender":"male"},
        "Lili": {"father": "Carl", "mother": "Emma","gender":"female"},
        "Lars": {"father": "top parent", "mother": "top parent","gender":"male"},
        "Kate": {"father": "top parent", "mother": "top parent", "gender":"female"},
        "Carl": {"father": "top parent", "mother": "top parent", "gender":"male"},
        "Emma": {"father": "top parent", "mother": "top parent","gender":"female"}}
    return members

def find_father(name, family):
    return family.get(name, {}).get("father", "not found in family tree so no such child")
def find_mother(name, family):
    return family.get(name, {}).get("mother", "not found in the  family tree so no such child")
def find_siblings(name, family):
    father=find_father(name, family)
    mother=find_mother(name, family)
    siblings=[member for member, info in family.items() if info.get("father")==father and info.get("mother")==mother and member!=name]
    return siblings
def count_members(family):
    return len(family)
def count_males(family):
    return sum(1 for info in family.values() if info.get("gender")=="male")
def count_females(family):
    return sum(1 for info in family.values() if info.get("gender")=="female")




def main():
    while True:
        title="FAmily tree system management".center(50,"*")
        print(title)
        print("*"*len(title))
        print("\n \n")
        menu=["option1-show members in a family tree","option2-Find father","option3-Find mother","option4-Find siblings","option5-how many members in family","option6-how many males","option7-how many females","option8-exit"]
        for item in menu:
            print(item)
        choice = int(input("Enter your choice: "))
        if choice == 1:
            print("showing members in a family tree")
            for member in family_tree().keys():
                print(member)
        elif choice == 2:
            print("Finding Father")
            father_name = input("Enter the name to find the father: ")
            father = find_father(father_name, family_tree())
            print(f"The father of {father_name} is {father}")
        elif choice == 3:
            print("Finding Mother")
            mother_name = input("Enter the name to find the mother: ")
            mother = find_mother(mother_name, family_tree())
            print(f"The mother of {mother_name} is {mother}")
        elif choice == 4:
            print("Finding siblings")
            parent_name = input("Enter the name to find sibling : ")
            siblings = find_siblings(parent_name, family_tree())
            if siblings:
                print(f"The siblingx of {parent_name} are : {siblings}")
            else:
                print(f"{parent_name} has no siblings in the family")
        elif choice == 5:
            print("counting members in the family")
            number_of_members = count_members(family_tree())
            print(f"The total number of members in family is : {number_of_members}")
        elif choice == 6:
            print("Counting males")
            males= count_males(family_tree())
            print(f"The total number of males in family is  : {males}")
        elif choice == 7:
            print("Counting females")
            females= count_females(family_tree())
            print(f"The total number of females in family is  : {females}")
        elif choice == 8:
            print("Exiting the program goodbye!")
            break
        else:
            print("Invaild choice please try again")
    
if __name__ == "__main__":
    main()