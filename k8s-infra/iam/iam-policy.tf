resource "aws_iam_policy" "load_balancer_controller_iam_policy" {
  policy = file("./iam/policy.json")
  name = "AWSLoadBalancerControllerIAMPolicy"
}
#
#
#resource "aws_iam_role" "eks_load_balancer_controller_role" {
#  name = "AmazonEKSLoadBalancerControllerRoleTest"
#  assume_role_policy = aws_iam_policy.load_balancer_controller_iam_policy.policy
#}
#
#resource "aws_iam_role_policy_attachment" "example" {
#  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"  # Replace with your desired policy ARN
#  role       = aws_iam_role.example.name
#}
