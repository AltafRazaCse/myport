import os
import subprocess

repo_dir = r'C:\Users\Asus\OneDrive\Desktop\port\myPortFolio2026march'
log_path = os.path.join(repo_dir, 'git_push_check.txt')

with open(log_path, 'w', encoding='utf-8') as log:
    log.write('cwd: ' + repo_dir + '\n')
    os.chdir(repo_dir)
    def run(cmd):
        log.write('COMMAND: ' + ' '.join(cmd) + '\n')
        try:
            res = subprocess.run(cmd, capture_output=True, text=True)
            log.write('RETURN: ' + str(res.returncode) + '\n')
            log.write('STDOUT:\n' + res.stdout + '\n')
            log.write('STDERR:\n' + res.stderr + '\n')
        except Exception as e:
            log.write('EXCEPTION: ' + repr(e) + '\n')
    run(['git', 'config', '--get', 'remote.origin.url'])
    run(['git', 'branch', '--show-current'])
    run(['git', 'status', '--short', '--branch'])
    run(['git', 'log', '--oneline', '-1'])
    run(['git', 'push', '-u', 'origin', 'main'])

print('done')
